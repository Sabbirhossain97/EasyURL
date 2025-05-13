import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import User from "../models/User.js"
import 'dotenv/config';

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const isUserExists = await User.findOne({ email });
        if (isUserExists) {
            return res.status(400).json({ error: "User already exists!" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username: username, email: email, password: hashedPassword })

        await newUser.save();
        res.status(201).json({ message: "User created successfully!" })
    } catch (err) {
        res.status(500).json({ error: 'Server error!' });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });

        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) return res.status(400).json({ error: 'Invalid credentials' });

        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({
            accessToken,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
            message: "Successfully logged in!"
        });

    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

export const authRoutes = (app) => {
    app.post("/signup", registerUser);
    app.post("/signin", loginUser)
}