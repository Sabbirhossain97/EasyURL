import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import { authRoutes } from './routes/authRoutes.js';
import { urlRoutes } from './routes/urlRoutes.js';
import useragent from "express-useragent";

const app = express();
app.use(cors());
app.set('trust proxy', true);
app.use(express.json());
app.use(useragent.express());
connectDB();
authRoutes(app);
urlRoutes(app);

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});