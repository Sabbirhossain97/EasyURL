import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import User from "../models/User.js"
import { sendEmail, sendRegisterEmail } from "../utils/sendEmail.js"
import 'dotenv/config';

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const isUserExists = await User.findOne({ email });
        if (isUserExists) {
            return res.status(400).json({ error: "User already exists!" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const createdAt = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        const newUser = new User({ username: username, email: email, password: hashedPassword, createdAt })

        await newUser.save();

        const html = `<p>🚀 Congratulations! A New User Registered at EasyURL!</p>
                      <p><b>Username:</b> ${username}</p>
                      <p><b>Email:</b> ${email}</p>
        `;

        await sendRegisterEmail('sabbirhossainbd199@gmail.com', 'Registration Alert at EasyURL', html)

        res.status(201).json({ message: "User created successfully!" })
    } catch (err) {
        res.status(500).json({ error: 'Server error!' });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'User not found!' });

        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) return res.status(400).json({ error: 'Invalid credentials' });

        const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

        let imageBase64 = null;
        if (user.image && user.image.data) {
            imageBase64 = `data:${user.image.contentType};base64,${user.image.data.toString("base64")}`;
        }

        res.json({
            accessToken,
            user: {
                id: user._id,
                username: user.username,
                role: user.role,
                email: user.email,
                image: imageBase64 ? imageBase64 : null
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
    app.post("/api/signup", registerUser);
    app.post("/api/signin", loginUser)
    app.post('/api/forgot-password', forgotPassword)
    app.post("/api/reset-password/:token", resetPassword)
}