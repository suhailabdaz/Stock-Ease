import { Router, Request, Response, NextFunction } from 'express';
import JwtControllers from '../../services/jwt';
import CustController from '../controllers/custController';

const controller = new CustController()

const jwtController=new JwtControllers()

const custRouter = Router();

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);

custRouter.post('/customers',asyncHandler(jwtController.isAuthenticated),asyncHandler(controller.addCustomer));
custRouter.get('/customers/:vendorid',asyncHandler(jwtController.isAuthenticated),asyncHandler(controller.getAllCustomers));
custRouter.get('/single-customer/:vendorid/:id',asyncHandler(jwtController.isAuthenticated),asyncHandler(controller.getCustomer));
custRouter.put('/customers/:vendorid/:id',asyncHandler(jwtController.isAuthenticated),asyncHandler(controller.editCustomer));


export default custRouter;