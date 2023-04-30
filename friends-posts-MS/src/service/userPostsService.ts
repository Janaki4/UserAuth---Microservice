import { CONSTANTS } from "../utils/Constants";
import User from "../db/models/user";
import { successResponse, errorResponse } from "../utils/Responses";
import { createJWTToken, verifyJWTHelper, createRefreshToken } from "../utils/Jwt";
import { createData, findById, findData, findOneData, updateOneData, getFeedPostQuery } from "../db/repository/wrapper";
import { Post } from "../db/models/post";
import { FriendRequest } from "../db/models/friendRequest";



export const createPostService = async (userId: string, payload: any) => {
    let { description, image, isImageAvailable, taggedPeople } = payload
    if (!isImageAvailable) image = null
    const postCreated = await createData(Post, { authorId: userId, description, image, isImageAvailable, taggedPeople })
    return { statusCode: 200, data: successResponse(postCreated) }
}

export const deletePostService = async (userId: string, postId: string) => {

    const postDeleted = await updateOneData(Post, { authorId: userId, _id: postId, isDeleted: false }, { isDeleted: true })
    if (postDeleted.modifiedCount) {
        return { statusCode: 200, data: successResponse(CONSTANTS.SUCCESS) }
    }
    return { statusCode: 400, data: successResponse(CONSTANTS.UNSUCCESS) }
}

export const postFeedService = async (userId: string, pageNumber: number = 1, pageSize: number = 10) => {

    const userDetails = await findOneData(User, { _id: userId, isDeleted: false })
    if (userDetails) {
        const listOfFriends = userDetails.friendsList
        const postDetails = await getFeedPostQuery(Post, listOfFriends, pageNumber, pageSize)
        return { statusCode: 200, data: successResponse(postDetails) }
    }
    return { statusCode: 400, data: successResponse(CONSTANTS.UNSUCCESS) }

}