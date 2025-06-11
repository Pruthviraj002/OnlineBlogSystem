import User from "../models/user.js"
import bcryptjs, { hash } from "bcryptjs"
import { errorHandler } from "../utils/error.js"
import jwt from "jsonwebtoken"

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


export const signIn = async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password || email === '' || password === '') {
        next(errorHandler(400, "All fields are required"))
    }
    try {
        //check email
        const validUser = await User.findOne({ email })
        if (!validUser) {
            return next(errorHandler(404, "User not found"))
        }


        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) {
            return next(errorHandler(400, "Invalid Password"))
        }

        const token = jwt.sign({ Id: validUser._id }, process.env.JWT_SECRET)
        const { password: pass, ...rest } = validUser._doc

        res.status(200).cookie("access_token", token, {
            httpOnly: true
        }).json(rest)

    } catch (error) {
        next(error)
    }
}