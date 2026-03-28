import Session from "../models/Session.js";
import User from "../models/User.js";
import { loginSchema, registerSchema } from "../schemas/auth.js"

export const getMe = async (req, res) => {
    try {
        const { _id, username, email, role } = req.user;
        return res.status(200).json({ user: { _id, username, email, role } });
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
}


export const register = async (req, res) => {
    const { data, success, error } = registerSchema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ error: error.errors });
    }
    try {
        const { username, email, password } = data;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }
        const newUser = new User({ username, email, password });
        await newUser.save();
        return res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const login = async (req, res) => {
    const { data, success, error } = loginSchema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ error: error.errors });
    }

    try {
        const { email, password } = data
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" });
        }
        // session creation and sending cookie
        const session = new Session({ userId: user._id });
        await session.save();
        res.cookie("uid", session._id, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 24 * 7,
        });
        return res.status(200).json({ message: "User logged in successfully" });
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }

}

export const logout = async (req, res) => {
    try {
        const uid = req.signedCookies.uid;
        if (!uid) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        await Session.deleteOne({ _id: uid });
        res.clearCookie("uid");
        return res.status(200).json({ message: "User logged out successfully" });
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
}