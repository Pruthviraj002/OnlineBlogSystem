import User from "../models/user.js"
import bcryptjs, { hash } from "bcryptjs"
import { errorHandler } from "../utils/error.js"

export const signup = async (req, res, next) => {
    // console.log(req.body);

    const { username, email, password } = req.body

    if (!username || !email || !password || username === '' || email === '' || password === '') {
        // return res.status(400).json({ "message": "All fields are required" })
        return next(errorHandler(400, "All field are required"))
    }
    //!password hashing
    const hashPassword = bcryptjs.hashSync(password, 10)

    const newUser = new User({
        username,
        email,
        password: hashPassword
    })

    try {
        await newUser.save()
        res.json("signup successful")
    } catch (error) {
        if (error.code === 11000) {
            return next(errorHandler(400, "Email already exists"));
        }
        next(error)
    }

}