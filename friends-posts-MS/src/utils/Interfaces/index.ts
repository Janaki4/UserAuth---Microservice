import mongoose, { model} from "mongoose";
import { Request } from "express";

export interface IUser extends mongoose.Document {
    email: string;
    password: string;
    name: string;
    isDeleted?: boolean;
    emailVerifyingToken: string;
    isEmailVerified?: boolean;
    refreshToken: string;
    friendsList: Array<string>;
}

export interface User {
    _id?: string;
    email: string;
    name: string;
}

export interface CustomRequest extends Request {
    id?: string
    name?: string
    email?: string
}

export interface FriendRequestInterface extends mongoose.Document  {
    requestedBy: String;
    requestedTo: String;
    requestStatus: number;
}


export interface PostInterface extends mongoose.Document { 
    description: string
    image: string
    isImageAvailable: boolean
    authorId: string
    taggedPeople: Array<string>
    isDeleted:boolean
}