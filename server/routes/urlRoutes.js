import Url from "../models/Url.js"
import Stat from "../models/Statistics.js"
import QRCode from 'qrcode'
import { nanoid } from 'nanoid';
import mongoose from "mongoose";

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
        case 'clickCount_asc':
            sortOption.clickCount = 1;
            break;
        case 'clickCount_desc':
            sortOption.clickCount = -1;
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

    if (!originalUrl || !/^https?:\/\/.+/.test(originalUrl)) {
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
            longUrl: originalUrl,
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
            originalUrl,
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
    const { customName } = req.body;
    const userId = req.user.id;

    try {
        const isCustomNameExist = await Url.findOne({ shortId: customName });

        if (isCustomNameExist) {
            return res.status(409).json({ error: "Custom name already taken!" });
        }

        const url = await Url.findOne({ shortId });
        if (!url) {
            return res.status(404).json({ error: "Short ID not found!" });
        }

        url.shortUrl = url.shortUrl.replace(url.shortId, customName);
        url.shortId = customName;
        await url.save();
        const urls = await Url.find({ user: userId });
        return res.status(200).json({ message: "Custom name added!", updatedUrl: urls });

    } catch (error) {
        console.error("Error customizing URL:", error.message);
        return res.status(500).json({ error: "Server error while customizing URL" });
    }
};

const redirectUrl = async (req, res) => {
    try {
        const { shortId } = req.params;
        const isQR = req.query.source === 'qr';
        const ua = req.useragent;
        const referrer = req.get('referer') || 'Direct';
        const url = await Url.findOneAndUpdate({ shortId }, {
            $inc: {
                clickCount: 1,
                'qr.scans': isQR ? 1 : 0
            }
        });

        if (!url) return res.status(404).send('URL not found');

        await url.save();

        const ip = "170.171.1.0"

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
            console.log(geoData)
        } catch (err) {
            console.error("Geo API error:", err.message);
        }

        const stat = new Stat({
            urlId: url._id,
            shortUrl: url.shortUrl,
            country: "Bangladesh",
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

const deleteUrl = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Url.findByIdAndDelete(id)
        await Stat.deleteMany({ urlId: id })
        if (!result) {
            return res.status(404).json({ error: 'URL not found!' })
        }
        res.json({ message: "URL deleted succesfully!" })
    } catch (err) {
        res.status(500).json({ error: "Failed to delete URL" })
    }
}


export const urlRoutes = (app) => {
    app.get("/shorten/urls", fetchUrls);
    app.get("/statistics/:urlId", fetchUrlStats);
    app.post("/shorten", createUrl);
    app.patch("/shorten/:shortId", customizeUrl);
    app.get('/:shortId', redirectUrl);
    app.delete('/:id', deleteUrl);

}