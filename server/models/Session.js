import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    expiresAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 60 * 24 * 7,
    },
})

const Session = new mongoose.model("Session", sessionSchema);

export default Session;