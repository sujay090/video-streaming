
import User from "../models/User.js";

export async function init() {
    try {

        const user = await User.findOne({ email: process.env.ADMIN_EMAIL });
        if (!user) {
            await User.create({
                username: "admin",
                email: process.env.ADMIN_EMAIL,
                password: process.env.ADMIN_PASSWORD,
                role: "admin",
            });
        }
    } catch (err) {
        console.log(err);
    }

}