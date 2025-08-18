import mongoose from "mongoose";
// import User from "../models/User.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected Successfully!');
    } catch (error) {
        console.error('MongoDB Connection Failed:', error.message);
        process.exit(1);
    }
}


// mongoose.connection.once('open', async () => {
//     await User.updateMany({ provider: { $exists: false } }, { $set: { provider: 'local' } });
//     console.log('Existing users updated.');
// })