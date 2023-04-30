import { sendFriendRequestService, acceptFriendRequestService, pendingFriendRequestListService ,friendsListService } from "../service/friendRequestService";
import {  RequestHandler } from "express";
import { CustomRequest } from "../utils/Interfaces";



export const sendFriendRequestController: RequestHandler = async (req: CustomRequest, res, next) => {
    try {
        const userId = req.id!;
        const recipientId = req.params.recipientid
        const { statusCode, data } = await sendFriendRequestService(userId, recipientId)
        res.status(statusCode).send(data)
    } catch (error) {
        next(error)
    }
}


export const acceptFriendRequestController: RequestHandler = async (req: CustomRequest, res, next) => {
    try {
        const userId = req.id!;
        const actionType = req.params.actiontype;
        const recipientId = req.params.recipientid;
        const { statusCode, data } = await acceptFriendRequestService(userId, actionType, recipientId)
        res.status(statusCode).send(data)
    } catch (error) {
        next(error)
    }
}

export const pendingFriendRequestListController: RequestHandler = async (req: CustomRequest, res, next) => {
    try {
        const userId = req.id!;
        const { statusCode, data } = await pendingFriendRequestListService(userId)
        res.status(statusCode).send(data)
    } catch (error) {
        next(error)
    }
}


export const friendsListController: RequestHandler = async (req: CustomRequest, res, next) => {
    try {
        const userId = req.id!;
        const { statusCode, data } = await friendsListService(userId)
        res.status(statusCode).send(data)
    } catch (error) {
        next(error)
    }
}
