import express from 'express';
import {RegisterUser, LoginUser, LogoutUser, GetCurrentUser} from '../controllers/authController.js'
import { protectedMiddleware } from '../middleware/authMiddleware.js';

const authRouter = express.Router();

authRouter.post('/register', RegisterUser)

authRouter.post('/login', LoginUser)

authRouter.get('/logout', LogoutUser)

authRouter.get('/getuser', protectedMiddleware, GetCurrentUser)

export default authRouter;