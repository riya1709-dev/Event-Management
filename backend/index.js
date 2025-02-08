require("dotenv").config()

const cors= require("cors")
const express= require("express")
const port = process.env.PORT || 5000;
require("./db/conn")

const fs= require('fs')
const path = require('path');

const app= express()
const _dirname=path.resolve()
app.use(express.json());
app.use(cors({origin:"*"}));

const authRoutes = require("./routes/authroutes");
const exp = require("constants");


//app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/event", authRoutes)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.static(path.join(_dirname,"/frontend/dist")))
app.get("*",(req,res)=>{
    res.sendFile(path.join(_dirname,"frontend","dist","index.html"))
})
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})
module.exports= app