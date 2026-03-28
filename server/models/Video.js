import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    fileName: {
        type: String,
        required: true,
    },
    contentType: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    key: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
        default: 0 // in seconds
    },
    publish: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, { strict: true });

videoSchema.pre("save", function () {
    this.updatedAt = Date.now();
})

const Video = mongoose.model("Video", videoSchema);

export default Video;