import { z } from 'zod'

export const videoSchema = z.object({
    title: z.string({ required_error: "Title is required" })
        .min(3, "Title must be at least 3 characters long")
        .max(50, "Title must be at most 50 characters long"),
    fileName: z.string({ required_error: "File name is required" }),
    duration: z.coerce.number({ required_error: "Duration is required" })
        .positive("Duration must be a positive number"),
    contentType: z.string({ required_error: "Content type is required" }),
})
