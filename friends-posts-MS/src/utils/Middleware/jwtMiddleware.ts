import { RequestHandler , Request , Response , NextFunction } from "express";
import { verifyJWTHelper } from "../Jwt/index";
import { CustomRequest } from "../Interfaces/index";
import { successResponse, errorResponse } from "../Responses/index";
import { CONSTANTS } from "../Constants";

export const auth = async (req:CustomRequest , res:Response, next:NextFunction) => {
    try {
        const headerToken: string | undefined = req.headers["authorization"] as string;
        if (headerToken) {
            // const headerToken: string = req.headers.authorization;
            const token: string = headerToken.replace("Bearer ", "");
            const decoded = await verifyJWTHelper(token, process.env.JWT_ACCESS_TOKEN_SECRET_KEY!);
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