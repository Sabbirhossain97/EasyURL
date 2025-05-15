import Url from "../models/Url.js"
import Stat from "../models/Statistics.js"
import QRCode from 'qrcode'
import geoip from 'geoip-lite';
import { UAParser } from 'ua-parser-js';
import { nanoid } from 'nanoid';


const fetchUrls = async (req, res) => {
    const userId = req.user.id;
    try {
        const urls = await Url.find({ user: userId })
        res.json(urls);
    } catch (err) {
        console.error('Error fetching URLs:', err.message);
        res.status(500).json({ error: 'Failed to fetch URLs' });
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
    const createdAt = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    try {
        const qrCodeDataUrl = await QRCode.toDataURL(shortUrl);
        const url = new Url({
            longUrl: originalUrl,
            shortUrl,
            shortId,
            createdAt,
            qrCode: qrCodeDataUrl,
            user: userId
        });
        await url.save();

        res.json({
            shortId,
            shortUrl,
            originalUrl,
            createdAt,
            qrcode: qrCodeDataUrl
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
        const url = await Url.findOne({ shortId });
        if (!url) return res.status(404).send('URL not found');

        url.clickCount++;
        await url.save();

        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const geo = geoip.lookup(ip);
        const ua = UAParser(req.headers['user-agent']);
        const referrer = req.get('referer') || 'Direct';

        const stat = new Stat({
            urlId: url._id,
            shortUrl: url.shortUrl,
            ipAddress: ip,
            country: geo?.country || 'Unknown',
            city: geo?.city || 'Unknown',
            browser: ua.browser.name || 'Unknown',
            os: ua.os.name || 'Unknown',
            device: ua.device.type || 'Desktop',
            referrer
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
        if (!result) {
            return res.status(404).json({ error: 'URL not found!' })
        }
        res.json({ message: "URL deleted succesfully!" })
    } catch (err) {
        res.status(500).json({ error: "Failed to delete URL" })
    }
}


export const urlRoutes = (app) => {
    app.get("/shorten", fetchUrls);
    app.post("/shorten", createUrl);
    app.patch("/shorten/:shortId", customizeUrl);
    app.get('/:shortId', redirectUrl);
    app.delete('/:id', deleteUrl);

}