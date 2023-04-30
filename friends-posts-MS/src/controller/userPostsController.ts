import { RequestHandler } from "express";
import { CustomRequest } from "../utils/Interfaces";
import { createPostService, deletePostService, postFeedService } from "../service/userPostsService";


export const createPostController: RequestHandler = async (req: CustomRequest, res, next) => {
    try {
        const userId = req.id!;
        const { statusCode, data } = await createPostService(userId, req.body)
        res.status(statusCode).send(data)
    } catch (error) {
        next(error)
    }
}


export const deletePostController: RequestHandler = async (req: CustomRequest, res, next) => {
    try {
        const userId = req.id!;
        const postId = req.params.postid
        const { statusCode, data } = await deletePostService(userId, postId)
        res.status(statusCode).send(data)
    } catch (error) {
        next(error)
    }
}

export const postFeedController: RequestHandler = async (req: CustomRequest, res, next) => {
    try {
        const userId = req.id!
        const pageNumber = +(req.query.pageNumber || 1)
        const pageSize = +(req.query.pageSize || 10)
        const { statusCode, data } = await postFeedService(userId, pageNumber , pageSize)
        res.status(statusCode).send(data)
    } catch (error) {
        next(error)
    }
}



