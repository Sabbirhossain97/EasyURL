import mongoose from "mongoose";

const statisticsSchema = new mongoose.Schema({
    urlId: { type: mongoose.Schema.Types.ObjectId, ref: 'Url' },
    shortUrl: {
        type: String,
        required: true
    },
    timestamp: { type: Date, default: Date.now },
    ipAddress: String,
    country: String,
    city: String,
    browser: String,
    os: String,
    device: String,
    referrer: String
})

const Stat = mongoose.model('Stat', statisticsSchema)

export default Stat;