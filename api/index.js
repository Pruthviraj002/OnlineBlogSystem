import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoute from './route/userRoute.js'
import authRoute from './route/authRoute.js'
import cookiesParser from 'cookie-parser'
dotenv.config()


mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log("mongoDB is connected");
    }).catch((err) => {
        console.log(err);


    })

const app = express()
app.use(express.json())

app.use(cookiesParser())



app.listen(3000, () => {
    console.log("server is running on port 3000");
})

app.use("/api/user", userRoute)
app.use("/api/auth", authRoute)


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})