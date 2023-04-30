const express = require("express");
const app = express();
const proxy = require("express-http-proxy")
const cors = require("cors");

app.use(cors())
app.use(express.json())


app.use("/public", proxy("http://localhost:3001"))
app.use("/private", proxy("http://localhost:3002"))


app.listen(3000, () => { 
    console.log("gateway is listening to port 3000")
})