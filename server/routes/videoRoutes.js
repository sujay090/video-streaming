import express from "express";
import { deleteVideo, getAllVideos, getUploadSignedUrl } from "../controllers/videoController.js";

const router = express.Router();

router.get("/", getAllVideos);
router.post("/presigned-url", getUploadSignedUrl);
router.delete("/:id", deleteVideo)






export default router;