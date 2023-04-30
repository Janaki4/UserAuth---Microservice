import mongoose, { Schema, model } from "mongoose";
import { IUser } from "../../utils/Interfaces/index";
import { string } from "zod";

const userSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        emailVerifyingToken: {
            type: String,
            required: true,
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        refreshToken: {
            type: String, 
            default:""
        },
        friendsList: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }
);


const User = model<IUser>("User", userSchema);

export default User;










// userSchema.pre("save", async function (next) {
//   let data = this as IUser;
//   if (data.isModified("password")) {
//     data.password = await bcrypt.hash(data.password, 10);
//   }
//   next();
// });
