import { CONSTANTS } from "../utils/Constants";
import User from "../db/models/user";
import { successResponse, errorResponse } from "../utils/Responses";
import { createJWTToken, verifyJWTHelper, createRefreshToken } from "../utils/Jwt";
import { createData, findById, findData, findOneData, updateOneData } from "../db/repository/wrapper";
import { Post } from "../db/models/post";
import { FriendRequest } from "../db/models/friendRequest";


export const sendFriendRequestService = async (userId: string, recipientId: string) => {
    const requestedToUserId = recipientId
    if (userId === requestedToUserId)
        return { statusCode: 400, data: errorResponse(CONSTANTS.INVALID_REQUEST) }

    const isRecipientUserExists = await findOneData(User, {
        _id: requestedToUserId,
        isDeleted: false,
    });
    if (isRecipientUserExists) {
        if (isRecipientUserExists.friendsList.includes(userId))
            return { statusCode: 400, data: errorResponse(CONSTANTS.ALREADY_FRIENDS) }
        await createData(FriendRequest, {
            requestedBy: userId,
            requestedTo: requestedToUserId,
        });
        return { statusCode: 200, data: successResponse(CONSTANTS.SUCCESS) }
    }
    else
        return { statusCode: 400, data: errorResponse(CONSTANTS.RECIPIENT_NOT_EXISTS) }
};




export const acceptFriendRequestService = async (userId: string, actionType: string, recipientId: string) => {
    if (+actionType !== 1 && +actionType !== 2)
        return { statusCode: 200, data: successResponse(CONSTANTS.INVALID_REQUEST) };

    const isRecordExists = await findOneData(FriendRequest, {
        requestedTo: userId,
        requestStatus: 0,
        requestedBy: recipientId,
    });
    if (isRecordExists) {
        const result = await updateOneData(FriendRequest,
            {
                requestedTo: userId,
                requestStatus: 0,
                requestedBy: recipientId,
            },
            { requestStatus: +actionType },
            );
            if (result == null) {
            return { statusCode: 400, data: successResponse(CONSTANTS.INVALID_REQUEST) };
        }
        if (+actionType === 1) {
            const addedFriend = await updateOneData(User,
                { _id: recipientId },
                { $push: { friendsList: userId } } 
            );

            if (addedFriend) {
                return { statusCode: 200, data: successResponse(CONSTANTS.FRIEND_REQUEST_ACCEPTED) };
            } else {
                return { statusCode: 400, data: successResponse(CONSTANTS.INVALID_REQUEST) };
            }
        } else {
            return { statusCode: 200, data: successResponse(CONSTANTS.FRIEND_REQUEST_DECLINED) };
        }
    } else {
        return { statusCode: 400, data: successResponse(CONSTANTS.INVALID_REQUEST) };
    }
};



export const pendingFriendRequestListService = async (userId: string) => {
    const pendindList = await findOneData(FriendRequest, {
        requestedTo: userId,
        requestStatus: 0,
    })
    if (pendindList) {
        const result =await  pendindList?.populate("requestedBy")
        return { statusCode: 200, data: successResponse(result) };
    }
    else
        return { statusCode: 200, data: successResponse({}) };
};


export const friendsListService = async (userId: string) => {

    let result = await findOneData(User, {
        _id: userId,
        isDeleted: false,
    })
    if (result) {
        const resData = await result.populate({ path: "friendsList", select: "-password -isDeleted -emailVerifyingToken -isEmailVerified -refreshToken -friendsList -createdAt -updatedAt -__v" })
        return { statusCode: 200, data: successResponse(resData) }
    }
    return { statusCode: 400, data: successResponse(CONSTANTS.UNSUCCESS) }

};
