import express, { Request, Response, NextFunction } from "express";;
const app = express();
import cors from "cors";

import { errorResponse } from "./utils/Responses/index";
import { databaseConnection } from "./db/connection"
import friendRequestRoute from "./routes/friendrequestRoutes"
import userPostRoute from "./routes/userPostsRoutes"

app.use(express.json());
app.options('*', cors());
// app.use(cors({
//   origin: process.env.PORT_URL,
//   credentials: true
// }))
app.set('trust proxy', 1);

databaseConnection()

app.use(friendRequestRoute);
app.use(userPostRoute);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    return res.status(500).send(errorResponse(err));
});


app.listen(+process.env.PORT_CODE!, () => { 
    console.log("PORT" , +process.env.PORT_CODE!)
});