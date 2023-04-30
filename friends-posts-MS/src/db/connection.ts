import mongoose from "mongoose";
require("dotenv").config()


const dbURL = process.env.DB_URL!;

export const databaseConnection = () => {
    mongoose
        .connect(dbURL)
        .then(() => console.log("db connected++++++++++++++"))
        .catch((err) => console.log("not connected =======================" + err));
}


