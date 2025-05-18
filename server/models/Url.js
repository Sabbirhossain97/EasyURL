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
    qr: {
        url: {
            type: String,
            required: true
        },
        code: {
            type: String
        },
        scans: {
            type: Number,
            default: 0
        }
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
    clickCount: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const Url = mongoose.model("Url", urlSchema);

export default Url;