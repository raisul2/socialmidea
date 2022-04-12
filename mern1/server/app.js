const express = require("express");
const app = express();
const cors = require('cors')
const path = require("path")


const fileupload = require('express-fileupload'); 

app.use(fileupload({useTempFiles: true}))
app.use(cors())


const cookieParser = require('cookie-parser')
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({path:"server/config/config.env"})
    
}


// using middlewere

app.use(express.json({limit: "50mb"}))
app.use(express.urlencoded({limit: "50mb", extended:true}))
app.use(cookieParser())

/// Importing route

const post = require('./routes/postRoute')
const user = require('./routes/userRoute')

/// Using route

app.use("/api/v1",post)
app.use("/api/v1",user)

app.use(express.static(path.join(__dirname, "../client/build")))

app.get("*", (req, res)=>{
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"))
})

module.exports = app
 