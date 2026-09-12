import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import { authRoutes } from './routes/authRoutes.js';
import { urlRoutes } from './routes/urlRoutes.js';
import useragent from "express-useragent";
import { userRoutes } from './routes/userRoutes.js';
import { adminRoutes } from './routes/adminRoutes.js';

const app = express();
app.use(cors());
app.set('trust proxy', true);
app.use(express.json());
app.use(useragent.express());
connectDB();
authRoutes(app);
urlRoutes(app);
userRoutes(app);
adminRoutes(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on port ${PORT}`);
});