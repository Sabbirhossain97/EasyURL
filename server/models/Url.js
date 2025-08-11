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
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    customName: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
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

urlSchema.index({ user: 1, shortId: 1 }, { unique: true })

const Url = mongoose.model("Url", urlSchema);

export default Url;