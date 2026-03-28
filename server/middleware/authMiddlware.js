import Session from "../models/Session.js";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const uid = req.signedCookies.uid;
        if (!uid) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const session = await Session.findById(uid);
        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const user = await User.findById(session.userId);
        if (!user) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
}