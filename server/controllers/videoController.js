import { deleteObject, getPresignedUrl } from "../services/s3.js";
import { videoSchema } from "../schemas/video.js";
import Video from "../models/Video.js";

export const getUploadSignedUrl = async (req, res) => {
    try {
        console.log(req.body)
        const { data, success, error } = videoSchema.safeParse(req.body);
        if (!success) {
            return res.status(400).json({ error: error.errors });
        }

        const { fileName, contentType, title, duration } = data;
        const extension = fileName.split(".").pop();
        const key = `${crypto.randomUUID()}.${extension}`

        // create video in db
        const video = new Video({ fileName, contentType, title, duration, key });
        await video.save();


        const url = await getPresignedUrl(key, contentType);
        return res.status(200).json({ url });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find().sort({ createdAt: -1 });
        return res.status(200).json({ videos });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const deleteVideo = async (req, res) => {
    try {
        const { id } = req.params;
        const video = await Video.findById(id);
        if (!video) {
            return res.status(404).json({ error: "Video not found" });
        }
        await deleteObject(video.key);
        await video.deleteOne();
        return res.status(200).json({ message: "Video deleted successfully" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal server error" });
    }
}