import { Router, Request, Response, NextFunction } from 'express';
import JwtControllers from '../../services/jwt';
import InventController from '../controllers/inventController';

const controller = new InventController()

const jwtController=new JwtControllers()

const inventRouter = Router();

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

inventRouter.post('/products',asyncHandler(jwtController.isAuthenticated),asyncHandler(controller.addProduct));
inventRouter.get('/products/:vendorid',asyncHandler(jwtController.isAuthenticated),asyncHandler(controller.getAllProducts));
inventRouter.get('/single-product/:vendorid/:id',asyncHandler(jwtController.isAuthenticated),asyncHandler(controller.getProduct));
inventRouter.put('/products/:vendorid/:id',asyncHandler(jwtController.isAuthenticated),asyncHandler(controller.editProduct));


export default inventRouter;