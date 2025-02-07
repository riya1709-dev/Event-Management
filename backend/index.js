require("dotenv").config()

const cors= require("cors")
const express= require("express")
const port = process.env.PORT || 5000;
require("./db/conn")

const fs= require('fs')
const path = require('path');

const app= express()
app.use(express.json());
app.use(cors({origin:"*"}));

const authRoutes = require("./routes/authroutes")


//app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/event", authRoutes)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})
module.exports= app