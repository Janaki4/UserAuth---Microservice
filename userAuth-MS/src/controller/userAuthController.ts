import { RequestHandler } from "express";
import { userLoginService, userSignUpService, verifyEmailService, getNewAccessTokenService } from "../service/userAuthService";

export const userSignUpController: RequestHandler = async (req, res, next) => {
    try {
        let { email, password, name } = req.body;
        const { statusCode, data } = await userSignUpService({ name, email, password })
        res.status(statusCode).send(data)
    } catch (error) {
        next(error)
    }
}


export const userLoginController: RequestHandler = async (req, res, next) => {
    try {
        const { emailId, password } = req.body;
        const { statusCode, data } = await userLoginService({ emailId, password })
        res.status(statusCode).send(data)
    } catch (error) {
        next(error)
    }
}


export const verifyEmailController: RequestHandler = async (req, res, next) => {
    try {
        const token: string = req.params.token;
        const { statusCode, data } = await verifyEmailService({ token })
        res.status(statusCode).send(data)
    } catch (error) {
        next(error)
    }
}

export const getNewAccessTokenController: RequestHandler = async (req, res, next) => {
try {
    const token: string = req.params.token
    const { statusCode , data } = await getNewAccessTokenService({token})
    res.status(statusCode).send(data)
} catch (error) {
    next(error)
}
}


// export const getUserDetailsController: RequestHandler = async (req, res, next) => {
//     try {
//         const { id } = req.params;
//         const { statusCode, data } = await getUserDetailsService({id})
//         res.status(statusCode).send(data)
//     } catch (error) {
//         next(error)
//     }
// }
