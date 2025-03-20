import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "./asyncHandler.js";

export const protectedMiddleware = asyncHandler (async (req, res, next) => {
    let token;

    // if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    //     token = req.headers.authorization.split(' ')[1];
    // }

    if (req.cookies.jwt) {
        token = req.cookies.jwt;
    } else {
        res.status(401)
        throw new Error("Unauthorized User, please login!!");
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        res.status(401)
        throw new Error("Unauthorized User, please login!!");   
    }
})

export const adminMiddleware = asyncHandler (async (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next()
    } else {
        res.status(401)
        throw new Error("Unauthorized access, restricted area only admin can access");
    }
})