import { z } from "zod";

export const registerSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long").max(10, "Username must be at most 10 characters long"),
    email: z.email("Invalid email address"),
    password: z.string().min(4, "Password must be at least 4 characters long"),
    role: z.enum(["user", "admin"]).default("user"),
})

export const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(4, "Password must be at least 4 characters long"),
})