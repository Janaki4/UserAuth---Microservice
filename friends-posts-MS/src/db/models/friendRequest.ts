import { Schema, model } from "mongoose";
import { FriendRequestInterface } from "../../utils/Interfaces/index";

const friendRequestSchema = new Schema<FriendRequestInterface>({
    requestedBy: {
        type: String,
        required: true,
        ref: "User"
    },
    requestedTo: {
        type: String,
        required: true,
        ref: "User"
    },
    requestStatus: {
        type: Number,
        default: 0
        // 0,1,2 -> requested , accepted , declined
    }
})

export const FriendRequest = model("FriendRequest" , friendRequestSchema)