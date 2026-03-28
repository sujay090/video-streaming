import http from 'node:http'
import mongoose from 'mongoose';
import app from './app.js';
import connectDB from './utils/db.js';
import { init } from './seeds/init.js';
const server = http.createServer(app);

connectDB();
init()
server.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
})


process.on("SIGINT", () => {
    console.log("server is shutting down");
    server.close();
    mongoose.connection.close();
    process.exit(0);
});

process.on("SIGTERM", () => {
    console.log("server is shutting down");
    server.close();
    mongoose.connection.close();
    process.exit(0);
});