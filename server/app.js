import expres from "express";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";
import videoRoutes from "./routes/videoRoutes.js";
import cookieParser from "cookie-parser";
const app = expres();

app.use(expres.json());
app.use(cookieParser())
app.use(cors("http://localhost:3000"));
//health check 
app.get("/", (req, res) => {
    return res.status(200).json({ message: "server is running" });
});


// auth routes

app.use("/api/auth", authRoutes);
app.use("/api/upload", videoRoutes)

export default app;
