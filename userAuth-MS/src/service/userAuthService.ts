import _ from "lodash";
import { CONSTANTS } from "../utils/Constants";
import User from "../db/models/user";
import { successResponse, errorResponse } from "../utils/Responses";
import { comparePasswordHelper, encryptPasswordHelper } from "../utils/Bcrypt";
import { createJWTToken, verifyJWTHelper , createRefreshToken } from "../utils/Jwt";
import { confirmationMail } from "../utils/Mailer";
import { createData, findById, findData, findOneData, updateOneData } from "../db/repository/wrapper";


export const userSignUpService = async (payload: any) => {
    let { email, password, name } = payload;
    const isUserAlreadyExists = await findOneData(User, { email, isDeleted: false })

    if (isUserAlreadyExists) {
        return { statusCode: 400, data: errorResponse(CONSTANTS.DUPLICATION) }
    }

    password = await encryptPasswordHelper(password);
    const createdJwt = await createJWTToken({ name, email, password }, process.env.JWT_ACCESS_TOKEN_SECRET_KEY!, "9999d");
    const result = await createData(User, { email, password, name, emailVerifyingToken: createdJwt });
    if (result) {
        const mailRes = await confirmationMail(
            email,
            name,
            "Verify your email address to proceed",
            result.emailVerifyingToken
        );
    }
    return { statusCode: 201, data: successResponse(result) }

};


export const userLoginService = async (payload: any) => {

    const { emailId, password } = payload
    const isUserExists = await findOneData(User, {
        email: emailId,
        isDeleted: false,
    });
    if (isUserExists) {
        if (!isUserExists.isEmailVerified) {
            return { data: errorResponse(CONSTANTS.EMAIL_NOT_VERIFIED), statusCode: 400 }
        }
        const isPasswordCorrect = await comparePasswordHelper(
            password,
            isUserExists.password
        );
        if (isPasswordCorrect) {
            const createdAccessToken = await createJWTToken(isUserExists, process.env.JWT_ACCESS_TOKEN_SECRET_KEY!, process.env.JWT_ACCESS_TOKEN_EXPIRY_TIME!);
            const createdRefreshToken = await createRefreshToken(isUserExists._id, process.env.JWT_REFRESH_TOKEN_SECRET_KEY!);
            const { _id, name, email } = _.omit(isUserExists, ["password"]);
            await updateOneData(User, { _id }, { refreshToken: createdRefreshToken })
            let result: { name: string; email: string; id: string; accessToken: string , refreshToken:string } =
            {
                id: _id,
                name,
                email: email,
                accessToken: createdAccessToken,
                refreshToken: createdRefreshToken
            };
            return { statusCode: 200, data: successResponse(result) }
        } else return { statusCode: 400, data: errorResponse(CONSTANTS.INCORRECT_PASSWORD) }
    }
    return { statusCode: 400, data: errorResponse(CONSTANTS.USER_NOT_FOUND) }
};


export const verifyEmailService = async (payload: { token: string }) => {

    const token = payload.token
    const decodedJwt = await verifyJWTHelper(token , process.env.JWT_ACCESS_TOKEN_SECRET_KEY!);
    const userDetails = await findOneData(User, {
        email: decodedJwt.email,
        isDeleted: false,
    });
    if (userDetails) {
        if (!userDetails?.isEmailVerified) {
            await updateOneData(User,
                { email: decodedJwt.email },
                { isEmailVerified: true }
            );
            return { statusCode: 200, data: successResponse(CONSTANTS.EMAIL_VERIFIED) }
        }
        return { statusCode: 200, data: successResponse(CONSTANTS.EMAIL_ALREADY_VERIFIED) }
    }
    else {
        return { statusCode: 400, data: errorResponse(CONSTANTS.UNSUCCESS) }
    }
};

export const getNewAccessTokenService = async (payload: { token: string }) => {
    const refreshToken = payload.token
    const extractedData = await verifyJWTHelper(refreshToken , process.env.JWT_REFRESH_TOKEN_SECRET_KEY!)
    const userDetails = await findById(User, { _id: extractedData.id })
    if (!userDetails?.refreshToken || userDetails.refreshToken !== refreshToken)
        return { statusCode: 400, data: errorResponse(CONSTANTS.REFRESH_TOKEN_DOESNOT_EXIST) }
    
    const createdAccessToken = await createJWTToken(userDetails, process.env.JWT_ACCESS_TOKEN_SECRET_KEY!, process.env.JWT_ACCESS_TOKEN_EXPIRY_TIME!);
    let result = {
        id: userDetails._id,
        name:userDetails.name,
        email: userDetails.email,
        accessToken: createdAccessToken,
        refreshToken
    };  

    return { statusCode: 200, data: successResponse(result) }
}

