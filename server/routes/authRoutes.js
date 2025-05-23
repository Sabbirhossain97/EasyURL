import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import User from "../models/User.js"
import sendEmail from "../utils/sendEmail.js";
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

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(409).json({ error: "Email doesn't exist" })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000;
        await user.save();
        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
        const html = `
        <p>You requested a password reset.</p>
        <p>Click <a href="${resetLink}">here</a> to reset your password. This link will expire in 1 hour.</p>
      `;
        await sendEmail(user.email, 'Reset your password', html)
        res.status(200).json({ message: 'Reset link sent to your email' });
    } catch (err) {
        res.status(500).json({ error: 'Server error!' });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { newPassword } = req.body;
        const { token } = req.params;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        })

        if (!user) {
            return res.status(409).json({ error: "Invalid or expired token" })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        return res.status(200).json({ message: 'Password reset successful' })
    } catch (err) {
        res.status(500).json({ error: 'Server error!' });
    }
}

export const authRoutes = (app) => {
    app.post("/signup", registerUser);
    app.post("/signin", loginUser)
    app.post('/forgot-password', forgotPassword)
    app.post("/reset-password/:token", resetPassword)
}