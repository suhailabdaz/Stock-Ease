import express, { Router, Request, Response } from 'express';
import AuthController from '../controllers/authController';

const controller = new AuthController()

const authRouter = express.Router();

authRouter.post('/register',controller.userRegister);

export default authRouter;