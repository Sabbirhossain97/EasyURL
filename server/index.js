import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from './config/db.js';
import { authRoutes } from './routes/authRoutes.js';
import { urlRoutes } from './routes/urlRoutes.js';
import { auth } from './middlewares/auth.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use("/shorten", auth)
authRoutes(app);
urlRoutes(app);
connectDB();

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});