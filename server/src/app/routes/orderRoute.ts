import { Router, Request, Response, NextFunction } from 'express';
import JwtControllers from '../../services/jwt';
import OrderController from '../controllers/orderController';

const controller = new OrderController()

const jwtController=new JwtControllers()

const orderRouter = Router();

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

orderRouter.post('/orders',asyncHandler(jwtController.isAuthenticated),asyncHandler(controller.createOrder));
orderRouter.get('/orders',asyncHandler(jwtController.isAuthenticated),asyncHandler(controller.getAllOrders));
orderRouter.get('/single-order/:id',asyncHandler(jwtController.isAuthenticated),asyncHandler(controller.getOrder));
orderRouter.patch('/orders/:id',asyncHandler(jwtController.isAuthenticated),asyncHandler(controller.editOrder));


export default orderRouter;