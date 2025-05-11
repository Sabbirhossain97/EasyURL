import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    longUrl: {
        type: String,
        required: true
    },
    shortUrl: {
        type: String,
        required: true
    },
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    qrCode: { type: String },
    clickCount: {
        type: Number,
        default: 0
    }

})

const Url = mongoose.model("Url", urlSchema);

export default Url;