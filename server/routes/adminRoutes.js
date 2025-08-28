import { auth, adminOnly } from "../middlewares/auth.js";
import Url from "../models/Url.js";
import User from "../models/User.js";
import Stat from "../models/Statistics.js";
import mongoose from "mongoose";

const getUserStats = async (req, res) => {
    const { sort } = req.query;
    let sortOption = {};
    switch (sort) {
        case 'createdAt_asc':
            sortOption.createdAt = 1;
            break;
        case 'createdAt_desc':
            sortOption.createdAt = -1;
            break;
        case 'urlCount_asc':
            sortOption.urlCount = 1;
            break;
        case 'urlCount_desc':
            sortOption.urlCount = -1;
            break;
        default:
            sortOption.createdAt = -1;
    }
    try {
        const sinceLastMonth = new Date();
        const sinceLastWeek = new Date();
        sinceLastMonth.setMonth(sinceLastMonth.getMonth() - 1);
        sinceLastWeek.setDate(sinceLastWeek.getDate() - 7);

        const [
            totalUrls,
            usersFromLastMonth,
            usersFromLastWeek,
            urlsFromLastMonth,
            urlsFromLastWeek,
            usersWithUrlCounts
        ] = await Promise.all([
            Url.countDocuments(),
            User.countDocuments({ createdAt: { $gte: sinceLastMonth } }),
            User.countDocuments({ createdAt: { $gte: sinceLastWeek } }),
            Url.countDocuments({ createdAt: { $gte: sinceLastMonth } }),
            Url.countDocuments({ createdAt: { $gte: sinceLastWeek } }),
            User.aggregate([
                {
                    $lookup: {
                        from: 'urls',
                        localField: '_id',
                        foreignField: 'user',
                        as: 'urls'
                    }
                },
                {
                    $project: {
                        urlCount: { $size: '$urls' },
                        username: 1,
                        email: 1,
                        role: 1,
                        provider: 1,
                        createdAt: 1,
                        lastSignedIn: 1,
                    }
                },
                {
                    $sort: sortOption
                }
            ])
        ]);

        res.status(200).json({
            usersData: usersWithUrlCounts,
            totalUrls,
            usersFromLastMonth,
            usersFromLastWeek,
            urlsFromLastMonth,
            urlsFromLastWeek
        });
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" });
    }
}

const deleteAccount = async (req, res) => {
    const { id } = req.body;
    const userId = mongoose.Types.ObjectId.createFromHexString(id);
    try {
        const userUrls = await Url.find({ user: userId });
        const urlIds = userUrls.map(url => url._id);
        await Url.deleteMany({ _id: { $in: urlIds } })
        await Stat.deleteMany({ urlId: urlIds })
        await User.findByIdAndDelete(userId);
        return res.status(200).json({ message: 'User delete successful' })
    } catch (err) {
        res.status(500).json({ error: 'Error deleting user account' });
    }
}

export const adminRoutes = (app) => {
    app.delete("/api/admin/delete-user", auth, adminOnly, deleteAccount);
    app.get("/api/admin/stats", auth, adminOnly, getUserStats)
}
