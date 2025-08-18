import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import crypto from 'crypto';
import User from "../models/User.js"
import { sendPasswordResetEmail, sendRegisterEmail, sendVerificationEmail } from "../utils/sendEmail.js"
import 'dotenv/config';
import fetch from 'node-fetch'

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const usernameRegex = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{3,20}$/;

        if (!username || !usernameRegex.test(username)) {
            return res.status(400).json({ error: "Username must be 3-20 characters and contain only letters, numbers, or underscores." });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format." });
        }

        if (!password || password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long." });
        }
        const isUserExists = await User.findOne({ email });

        if (isUserExists && isUserExists.provider === "google") {
            return res.status(409).json({ error: "This user is already registered with Google. Please log in" })
        }

        if (isUserExists) {
            return res.status(400).json({ error: "User already exists!" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const verificationToken = crypto.randomBytes(32).toString('hex');
        const tokenExpiry = Date.now() + 1000 * 60 * 60;

        const createdAt = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            createdAt,
            isVerified: false,
            verificationToken,
            tokenExpiry
        });

        await newUser.save();
        const resetLink = `${process.env.FRONTEND_URL}/verify-register/${verificationToken}`;
        const verifyHtml = `
                             <h2>Email Verification - EasyURL</h2>
                             <p>Click the link below to verify your account:</p>
                             <a href="${resetLink}">${resetLink}</a>
                             <p>This link will expire in 1 hour.</p>
                            `

        await sendVerificationEmail(email, 'Verify your email', verifyHtml);
        res.status(201).json({ message: "Verification link sent to your email!" })
    } catch (err) {
        res.status(500).json({ error: 'Server error!' });
    }
}

const verifyUser = async (req, res) => {
    try {
        const { token } = req.params;
        const user = await User.findOne({
            verificationToken: token,
            tokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired verification token!.' })
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.tokenExpiry = undefined;
        await user.save();
        const html = `<p>🚀 Congratulations! A New User Registered at EasyURL!</p>
                      <p><b>Username:</b> ${user.username}</p>
                      <p><b>Email:</b> ${user.email}</p>
                    `;

        await sendRegisterEmail('sabbirhossainbd199@gmail.com', 'Registration Alert at EasyURL', html);
        res.status(200).json({ message: 'Email verified successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'User not found!' });

        if (!user.isVerified) {
            return res.status(403).json({ error: 'Please verify your email before logging in.' });
        }

        if (user.provider === 'google') {
            return res.status(409).json({ error: 'This email is already registered with Google. Please log in using Google instead.' })
        }

        const isMatched = bcrypt.compare(password, user.password);
        if (!isMatched) return res.status(400).json({ error: 'Invalid credentials' });

        const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

        let imageBase64 = null;
        if (user.image && user.image.data) {
            imageBase64 = `data:${user.image.contentType};base64,${user.image.data.toString("base64")}`;
        }

        user.lastSignedIn = new Date();
        await user.save()

        res.json({
            accessToken,
            user: {
                id: user._id,
                username: user.username,
                role: user.role,
                email: user.email,
                image: imageBase64 ? imageBase64 : null,
                provider: 'local',
            },
            message: "Successfully logged in!"
        });

    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}


const googleLogin = async (req, res) => {
    try {
        const { token } = req.body
        const googleRes = await fetch(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`
        )
        const profile = await googleRes.json();
        let user = await User.findOne({ email: profile.email });
        if (user) {
            if (user.provider === 'local') {
                user.provider = 'local';
            }
            user.isVerified = true;
            user.verificationToken = undefined;
            user.tokenExpiry = undefined;
            user.lastSignedIn = new Date();
            user.image.url = profile.picture;
            await user.save();
        } else {
            user = new User({
                username: profile.name,
                email: profile.email,
                provider: 'google',
                password: null,
                isVerified: true,
                verificationToken: undefined,
                tokenExpiry: undefined,
                lastSignedIn: new Date(),
                image: { url: profile.picture }
            })
            await user.save()
        }

        const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

        let imageBase64 = null;
        if (user.image && user.image.data) {
            imageBase64 = `data:${user.image.contentType};base64,${user.image.data.toString("base64")}`;
        } else if (user.image && user.image.url) {
            imageBase64 = user.image.url;
        }

        res.json({
            accessToken,
            user: {
                id: user._id,
                username: user.username,
                role: user.role,
                email: user.email,
                image: imageBase64 ? imageBase64 : null,
                provider: 'google',

            },
            message: "Successfully logged in with Google!"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Google login failed" });
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(409).json({ error: "Email doesn't exist" })
        }

        if (!user.isVerified) {
            return res.status(403).json({ error: 'Please verify your email before password reset.' });
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
        await sendPasswordResetEmail(user.email, 'Reset your password', html)
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
    app.post("/api/signin", loginUser);
    app.post("/api/google", googleLogin)
    app.get('/api/verify-register/:token', verifyUser);
    app.post('/api/forgot-password', forgotPassword)
    app.post("/api/reset-password/:token", resetPassword)
}