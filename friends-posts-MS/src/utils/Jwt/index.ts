import { IUser, User } from "../Interfaces/index"
const jwt = require("jsonwebtoken");
require("dotenv").config();


export async function createJWTToken(data: any, jwtSecret: string, expiryTime: string): Promise<string> {
    const token = await jwt.sign(
        { id: data._id, name: data.name, email: data.email },
        jwtSecret, { expiresIn: expiryTime }
    );
    return Promise.resolve(token);
}

export async function createRefreshToken(id: string, jwtSecret: string): Promise<string> {
    const token = await jwt.sign({ id }, jwtSecret)
    return token
}

interface JwtPayload {
    email?: string;
    name?: string
    id?: string
}
export async function verifyJWTHelper(token: string , secret:string): Promise<JwtPayload> {
    const decoded = await jwt.verify(token, secret);
    return decoded
}

export async function decodeExpiredJwt(token: string): Promise<JwtPayload> {
    const decoded = await jwt.decode(token, { complete: true })
    return decoded
}