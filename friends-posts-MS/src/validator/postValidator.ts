import { z } from "zod";

export const createPostValidator = z.object({
    body: z.object({
        description: z.string({ required_error: "description is required", }),
        image: (z.string()),
        isImageAvailable: z.boolean({ required_error: "isImageAvailable is required" }),
        taggedPeople:(z.array(z.string())),
    })
})