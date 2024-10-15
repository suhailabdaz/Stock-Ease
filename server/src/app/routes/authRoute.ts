import express, { Router, Request, Response } from 'express';
import AuthController from '../controllers/authController';
import JwtControllers from '../../services/jwt';

const controller = new AuthController()

const jwtController=new JwtControllers()

const authRouter = express.Router();

const asyncHandler = (fn: Function) => (req: express.Request, res: express.Response, next: express.NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

authRouter.post('/register',asyncHandler(controller.userRegister));
authRouter.post('/verifyotp',asyncHandler(controller.verifyOtp));
authRouter.post('/login',asyncHandler(controller.login));
authRouter.post('/refresh', asyncHandler(jwtController.refreshToken));
authRouter.post('/logout',asyncHandler(jwtController.isAuthenticated), asyncHandler(jwtController.isAuthenticated),asyncHandler( jwtController.logout));

export default authRouter;