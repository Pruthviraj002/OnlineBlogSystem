import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    console.log("Token from cookies:", token); // Debug: Check if token exists

    if (!token) {
        console.log("No token found"); // Debug
        return next(errorHandler(401, "Unauthorized"));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log("Token error:", err.message); // Debug: Expired? Invalid?
            return next(errorHandler(401, "Unauthorized"));
        }

        console.log("Decoded user:", decoded); // Debug: Check payload
        req.user = decoded; // Ensure decoded has `id`
        next();
    });
};