import { Router, Request, Response, NextFunction } from 'express';
import JwtControllers from '../../services/jwt';
import InventController from '../controllers/inventController';

const controller = new InventController()

const jwtController=new JwtControllers()

const inventRouter = Router();

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

inventRouter.post('/products',asyncHandler(jwtController.isAuthenticated),asyncHandler(controller.addProduct));
// inventRouter.get('/products',asyncHandler(jwtController.isAuthenticated),asyncHandler(controller.getProducts));
// inventRouter.put('/products/:id',asyncHandler(jwtController.isAuthenticated),asyncHandler(controller.editProduct));
// inventRouter.patch('/products/:id',asyncHandler(jwtController.isAuthenticated), asyncHandler(jwtController.blockProduct));

export default inventRouter;