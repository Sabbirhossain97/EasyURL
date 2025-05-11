import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import 'dotenv/config';
import QRCode from 'qrcode'
import Url from './models/Url.js';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB Connected!"))
    .catch((err) => console.log("Failed to Connect to mongodb!"))

app.get("/", async (req, res) => {
    try {
        const urls = await Url.find({})
        res.json(urls);
    } catch (err) {
        console.error('Error fetching URLs:', err.message);
        res.status(500).json({ error: 'Failed to fetch URLs' });
    }
})


app.post('/shorten', async (req, res) => {
    const { originalUrl } = req.body;
    const shortId = nanoid(6);

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
            qrCode: qrCodeDataUrl
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
});


app.get('/:shortId', async (req, res) => {
    const { shortId } = req.params;
    const url = await Url.findOne({ shortId })
    if (url) {
        url.clickCount++;
        await url.save()
        res.redirect(url.longUrl);
    } else {
        res.status(404).send('URL not found');
    }
});

app.delete('/:id', async (req, res) => {
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
})


app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});