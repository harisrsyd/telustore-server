import User from "../models/User.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../middleware/asyncHandler.js";

const signToken = id => {
    return jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: '8h'
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user.id);
    const cookieOption = {
        expire: new Date(Date.now() + 8 * 60 * 60 * 1000),
        httpOnly: true,
        security: false,
    };
    res.cookie('jwt', token, cookieOption);
    user.password = undefined;
    res.status(statusCode).json({
        data: user,
        token: token
    });
};

export const RegisterUser = asyncHandler (async (req, res) => {
    const createUser = await User.create({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role? body.role : 'user'
    });
    createSendToken(createUser, 201, res)
});

export const LoginUser = asyncHandler (async (req, res) => {
    if (!req.body.identifier || req.body.identifier === '') {
        res.status(400)
        throw new Error("Username or email is required");
    }
    if (!req.body.password || req.body.password === '') {
        res.status(400)
        throw new Error("Password can not be empty");
    }
    const userData = await User.findOne({
        $or: [{username: req.body.identifier}, {email: req.body.identifier}]
    })
    if (!userData || !(await userData.comparePass(req.body.password))) {
        throw new Error("Invalid credentials, username or password may be wrong")
    }
    createSendToken(userData, 200, res)
});
export const LogoutUser = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 1 * 1000),
        httpOnly: true,
        security: false
    });
    res.status(200).json({
        message: "User has been logged out"
    });
};
export const GetCurrentUser = asyncHandler (async(req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
        res.status(404)
        throw new Error("User not found")
    }
    res.status(200).json({
        data: user
    });
});