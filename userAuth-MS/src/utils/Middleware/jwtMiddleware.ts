import { RequestHandler } from "express";
import { verifyJWTHelper } from "../Jwt/index";
import { CustomRequest } from "../Interfaces/index";
import { successResponse, errorResponse } from "../Responses/index";
import { CONSTANTS } from "../Constants";

export const auth: RequestHandler = async (req: CustomRequest, res, next) => {
    try {
        if (req.headers.authorization) {
            const headerToken: string = req.headers.authorization;
            const token: string = headerToken.replace("Bearer ", "");
            const decoded = await verifyJWTHelper(token , process.env.JWT_ACCESS_TOKEN_SECRET_KEY!);
            req.id = decoded.id;
            req.email = decoded.email;
            req.name = decoded.name;
            next();
        } else {
            return res
                .status(400)
                .send(errorResponse(CONSTANTS.ACCESS_TOKEN_MISSING));
        }
    } catch (error) {
        next(error);
    }
};