import Url from "../models/Url.js"
import Stat from "../models/Statistics.js"
import QRCode from 'qrcode'
import { nanoid } from 'nanoid';
import mongoose from "mongoose";
import { auth } from "../middlewares/auth.js";

const fetchUrls = async (req, res) => {
    const userId = req.user.id;
    const { sort } = req.query;
    let sortOption = {};
    switch (sort) {
        case 'createdAt_asc':
            sortOption.createdAt = 1;
            break;
        case 'createdAt_desc':
            sortOption.createdAt = -1;
            break;
        case 'updatedAt_asc':
            sortOption.updatedAt = 1;
            break;
        case 'updatedAt_desc':
            sortOption.updatedAt = -1;
            break;
        case 'clickCount_asc':
            sortOption.clickCount = 1;
            break;
        case 'clickCount_desc':
            sortOption.clickCount = -1;
            break;
        case 'qrScans_asc':
            sortOption['qr.scans'] = 1;
            break;
        case 'qrScans_desc':
            sortOption['qr.scans'] = -1
            break;
        case 'active':
            sortOption['status'] = 1
            break;
        case 'inactive':
            sortOption['status'] = -1
            break;
        default:
            sortOption.createdAt = -1;
    }
    try {
        const urls = await Url.find({ user: userId }).sort(sortOption)
        res.json(urls);
    } catch (err) {
        console.error('Error fetching URLs:', err.message);
        res.status(500).json({ error: 'Failed to fetch URLs' });
    }
}

const fetchUrlStats = async (req, res) => {
    const { urlId } = req.params;
    let urlStats = {}
    try {
        const objectId = mongoose.Types.ObjectId.createFromHexString(urlId);

        urlStats.stats = await Stat.find({ urlId: objectId });

        urlStats.visits = await Url.findById(objectId);

        const dailyStats = await Stat.aggregate([
            { $match: { urlId: objectId } },
            {
                $group: {
                    _id: {
                        year: { $year: "$timestamp" },
                        month: { $month: "$timestamp" },
                        day: { $dayOfMonth: "$timestamp" }
                    },
                    count: { $sum: 1 }
                }
            }
        ]);

        const dailyAverage = dailyStats.length
            ? dailyStats.reduce((acc, curr) => acc + curr.count, 0) / dailyStats.length
            : 0;

        const weeklyStats = await Stat.aggregate([
            { $match: { urlId: objectId } },
            {
                $group: {
                    _id: {
                        year: { $isoWeekYear: "$timestamp" },
                        week: { $isoWeek: "$timestamp" }
                    },
                    count: { $sum: 1 }
                }
            }
        ]);

        const weeklyAverage = weeklyStats.length
            ? weeklyStats.reduce((acc, curr) => acc + curr.count, 0) / weeklyStats.length
            : 0;

        const monthlyStats = await Stat.aggregate([
            { $match: { urlId: objectId } },
            {
                $group: {
                    _id: {
                        year: { $year: "$timestamp" },
                        month: { $month: "$timestamp" }
                    },
                    count: { $sum: 1 }
                }
            }
        ]);

        const monthlyAverage = monthlyStats.length
            ? monthlyStats.reduce((acc, curr) => acc + curr.count, 0) / monthlyStats.length
            : 0;

        urlStats.averages = {
            daily: dailyAverage,
            weekly: weeklyAverage,
            monthly: monthlyAverage
        };

        urlStats.uniqueVisitors = await Stat.aggregate([
            { $match: { urlId: objectId } },
            { $group: { _id: "$ip" } }
        ])

        urlStats.countryStats = await Stat.aggregate([
            { $match: { urlId: objectId } },
            { $group: { _id: "$country", count: { $sum: 1 } } }
        ])

        urlStats.referrerStats = await Stat.aggregate([
            { $match: { urlId: objectId } },
            { $group: { _id: "$referrer", count: { $sum: 1 } } }
        ]);

        urlStats.browserStats = await Stat.aggregate([
            { $match: { urlId: objectId } },
            { $group: { _id: "$browser", count: { $sum: 1 } } }
        ]);

        urlStats.platformStats = await Stat.aggregate([
            { $match: { urlId: objectId } },
            { $group: { _id: "$platform", count: { $sum: 1 } } }
        ]);

        res.json(urlStats);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch URL Stats' });
    }
}

const createUrl = async (req, res) => {
    const { originalUrl } = req.body;
    const shortId = nanoid(6);
    const userId = req.user.id;
    const trimmedUrl = originalUrl?.trim();

    const isUrlExists = await Url.findOne({
        user: mongoose.Types.ObjectId.createFromHexString(userId),
        $or: [
            { longUrl: trimmedUrl },
            { shortUrl: trimmedUrl }
        ]
    })

    if (isUrlExists) {
        return res.status(400).json({ error: "URL already exists." });
    }

    if (!trimmedUrl) {
        return res.status(400).json({ error: 'Please enter an URL' });
    }

    if (!/^https?:\/\/.+/.test(trimmedUrl)) {
        return res.status(400).json({ error: 'Invalid URL' });
    }

    const shortUrl = `${process.env.BASE_URL}/${shortId}`;
    const qrUrl = `${process.env.BASE_URL}/${shortId}?source=qr`;
    const createdAt = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    try {
        const qrCodeDataUrl = await QRCode.toDataURL(qrUrl);
        const url = new Url({
            longUrl: trimmedUrl,
            shortUrl,
            qr: { url: qrUrl, code: qrCodeDataUrl },
            shortId,
            createdAt,
            user: userId
        });
        await url.save();

        res.json({
            shortId,
            shortUrl,
            trimmedUrl,
            createdAt,
            qr: { url: qrUrl, code: qrCodeDataUrl },
        });
    } catch (err) {
        console.error('QR Code generation error:', err.message);
        res.status(500).json({ error: 'Failed to generate QR Code' });
    }
}

const customizeUrl = async (req, res) => {
    const { shortId } = req.params;
    const { customName, activeStatus } = req.body;
    const userId = mongoose.Types.ObjectId.createFromHexString(req.user.id);

    try {
        if (customName !== undefined && customName !== null) {
            if (typeof customName !== 'string') {
                return res.status(400).json({ error: "Custom name must be fully string or alphanumeric." });
            }
            if (customName.length < 4 || customName.length > 30) {
                return res.status(400).json({ error: "Custom name must be between 4 and 30 characters." });
            }

            const isCustomNameExist = await Url.findOne({ customName: customName, user: userId, shortId: { $ne: shortId } });
            if (isCustomNameExist) {
                return res.status(409).json({ error: "Custom name already taken!" });
            }
        }

        const url = await Url.findOne({ shortId, user: userId });
        if (!url) {
            return res.status(404).json({ error: "Short ID not found!" });
        }

        if (customName) {
            url.customName = customName;
            url.shortUrl = `${process.env.BASE_URL}/${customName}`;
        }

        url.status = activeStatus
        url.updatedAt = new Date();
        await url.save();

        const urls = await Url.find({ user: userId });
        return res.status(200).json({ message: "URL updated!", updatedUrl: urls });
    } catch (error) {
        console.error("Error customizing URL:", error.message);
        return res.status(500).json({ error: "Server error while customizing URL" });
    }
};

const redirectUrl = async (req, res) => {
    try {
        const { id } = req.params;
        const isQR = req.query.source === 'qr';
        const ua = req.useragent;
        const referrer = req.get('referer') || 'Direct';
        const url = await Url.findOneAndUpdate(
            { $or: [{ shortId: id }, { customName: id }], status: "active" },
            { $inc: { clickCount: 1, 'qr.scans': isQR ? 1 : 0 } },
            { sort: { updatedAt: -1 }, new: true }
        );

        if (!url) {
            const inactiveUrl = await Url.findOne({ $or: [{ shortId: id }, { customName: id }], status: "inactive" });
            if (inactiveUrl) {
                return res.redirect(`${process.env.FRONTEND_URL}/inactive`)
            } else {
                res.status(500).send('Server error');
            }
        }

        await url.save();
        const ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress;
        let geoData;
        try {
            const response = await fetch(`https://ipapi.co/${ip}/json/`, {
                method: "GET",
                headers: {
                    "User-Agent": "Node.js"
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            geoData = await response.json();
        } catch (err) {
            console.error("Geo API error:", err.message);
        }

        const stat = new Stat({
            urlId: url._id,
            shortUrl: url.shortUrl,
            ip: ip,
            country: geoData?.country_name || "Unknown",
            browser: ua.browser || 'Unknown',
            platform: ua.platform || 'Unknown',
            referrer: referrer
        });

        await stat.save();

        return res.redirect(url.longUrl);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
}


const deleteMultipleUrls = async (req, res) => {
    try {
        const { ids } = req.body
        const objectIds = ids.map((id) => mongoose.Types.ObjectId.createFromHexString(id));
        await Url.deleteMany({ _id: { $in: objectIds } })
        await Stat.deleteMany({ urlId: objectIds })
        res.json({ message: "URLs deleted succesfully!" })
    } catch (err) {
        res.status(500).json({ error: "Failed to delete URLs" })
    }
}

export const urlRoutes = (app) => {
    app.post("/api/shorten/create-url", auth, createUrl);
    app.get("/api/shorten/urls", auth, fetchUrls);
    app.get("/api/statistics/:urlId", auth, fetchUrlStats);
    app.patch("/api/shorten/:shortId", auth, customizeUrl);
    app.delete("/api/delete-urls", auth, deleteMultipleUrls);
    app.get('/:id', redirectUrl);
}