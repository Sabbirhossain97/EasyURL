import { auth } from "../middlewares/auth.js";
import Url from "../models/Url.js";
import User from "../models/User.js";
import Stat from "../models/Statistics.js";
import mongoose from "mongoose";
import multer from 'multer';
import bcrypt from "bcryptjs"

const storage = multer.memoryStorage();
const upload = multer({ storage });

const deleteAccount = async (req, res) => {
    const userId = mongoose.Types.ObjectId.createFromHexString(req.user.id);
    try {
        const userUrls = await Url.find({ user: userId });
        const urlIds = userUrls.map(url => url._id);
        await Url.deleteMany({ _id: { $in: urlIds } })
        await Stat.deleteMany({ urlId: urlIds })
        await User.findByIdAndDelete(userId);
        return res.status(200).json({ message: 'Account delete successful' })
    } catch (err) {
        res.status(500).json({ error: 'Error deleting user account' });
    }
}

const updateProfile = async (req, res) => {
    const userId = mongoose.Types.ObjectId.createFromHexString(req.user.id)
    try {
        const user = await User.findById(userId);
        const isMatched = await bcrypt.compare(req.body.password, user.password);
        if (!isMatched) return res.status(400).json({ error: 'Wrong password' });
        user.username = req.body.username
        if (req.file) {
            user.image.data = req.file.buffer;
            user.image.contentType = req.file.mimetype;
        }
        await user.save();

        let imageBase64 = null;
        if (user.image && user.image.data) {
            imageBase64 = `data:${user.image.contentType};base64,${user.image.data.toString("base64")}`;
        }

        res.json({
            message: "Profile updated successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                image: imageBase64
            }
        });
    } catch (err) {
        res.status(500).json({ error: 'Error updating user account' });
    }
}

export const userRoutes = (app) => {
    app.delete("/api/delete-account", auth, deleteAccount);
    app.post("/api/update-profile", upload.single('profilePicture'), auth, updateProfile)
}