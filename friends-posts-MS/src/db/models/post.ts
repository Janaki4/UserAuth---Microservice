import { PostInterface } from "../../utils/Interfaces/index";
import mongoose, { Schema, model } from "mongoose";

const postSchema = new Schema<PostInterface>(
    {
        description: {
            type: String,
            required: false,
        },
        image: {
            type: String,
            required: false,
        },
        isImageAvailable: {
            type: Boolean,
            default: false,
        },
        authorId: {
            type: String,
            required: true,
            ref: "User"
        },
        taggedPeople: {
            type: [String],
            ref: "User",
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export const Post = model("Post", postSchema);
