import express from 'express';
import cors from 'cors';
import { nanoid } from 'nanoid';
import 'dotenv/config';
import QRCode from 'qrcode'

const app = express();
app.use(cors());
app.use(express.json());

const urlDatabase = {}

const formateDate = (date) => {
    const options = { month: 'short', day: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-US', options).replace(',', '').replace(' ', '-').replace(' ', '-');
}

app.post('/shorten', async (req, res) => {
    const { originalUrl } = req.body;
    const shortId = nanoid(6);

    if (!originalUrl || !/^https?:\/\/.+/.test(originalUrl)) {
        return res.status(400).json({ error: 'Invalid URL' });
    }
    const date = new Date()
    const createdAt = formateDate(date);
    urlDatabase[shortId] = originalUrl;

    const shortUrl = `${process.env.BASE_URL}/${shortId}`;
    try {
        const qrCodeDataUrl = await QRCode.toDataURL(shortUrl)

        res.json({
            shortUrl,
            originalUrl,
            createdAt,
            qrcode: qrCodeDataUrl
        }
        )
    } catch (err) {
        console.error('QR Code generation error:', err.message);
        res.status(500).json({ error: 'Failed to generate QR Code' });
    }
}
)


app.get('/:shortId', (req, res) => {
    const { shortId } = req.params;
    const originalUrl = urlDatabase[shortId];

    if (originalUrl) {
        res.redirect(originalUrl);
    } else {
        res.status(404).send('URL not found');
    }
});


app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});