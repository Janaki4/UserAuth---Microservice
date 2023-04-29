import express, { Request, Response, NextFunction } from "express";;
const app = express();
import cors from "cors";

import { errorResponse } from "./utils/Responses/index";
import userAuthRouter from "./routes/userAuthRouter";
import {databaseConnection} from "./db/connection"

app.use(express.json());
app.options('*', cors());
// app.use(cors({
//   origin: process.env.PORT_URL,
//   credentials: true
// }))
app.set('trust proxy', 1);

databaseConnection()

app.use(userAuthRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    return res.status(500).send(errorResponse(err));
});


app.listen(+process.env.PORT_CODE!);
