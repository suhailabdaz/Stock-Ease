import express, { Router, Request, Response } from 'express';
import AuthController from '../controllers/authController';
import JwtControllers from '../../services/jwt';

const controller = new AuthController()

const jwtController=new JwtControllers()

const authRouter = express.Router();

authRouter.post('/register',controller.userRegister);
authRouter.post('/verifyotp',controller.verifyOtp);
authRouter.post('/login',controller.login);
authRouter.get('/refresh', jwtController.refreshToken as unknown as express.RequestHandler);
authRouter.post('/logout', jwtController.isAuthenticated as express.RequestHandler, jwtController.logout as unknown as express.RequestHandler);

export default authRouter;