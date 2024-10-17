import { Request, Response } from 'express';
import OrderService from '../services/orderService';
import { StatusCode } from '../../enums/statusCodes';
import { ResOrder, StatusMessage } from '../../interfaces/interface';
import IOrderService from '../../interfaces/iServices/iOrderService';

const service = new OrderService();

export default class OrderController {
  private service: IOrderService;

  constructor() {
    this.service = service;
  }

  createOrder = async (req: Request, res: Response) => {
    try {
      const registerResponse: ResOrder = (await this.service.createOrder(
        req.body
      )) as ResOrder;
      if(registerResponse){
        res.status(StatusCode.Created).json({status:StatusCode.Created,message:'Successfullycreated'});
      }else{
        res.status(StatusCode.InternalServerError).json({status:StatusCode.InternalServerError,message:'Error'});
      }
    } catch (error) {
      res.status(StatusCode.InternalServerError).json({
        status: StatusCode.InternalServerError,
        message: 'Internal Server Error',
      });
    }
  };
  getAllOrders = async (req: Request, res: Response) => {
    try {
      const AllOrdersResponse = await this.service.getAllOrders(null);
      res.status(StatusCode.OK).json({orders:AllOrdersResponse});
    } catch {
      res.status(StatusCode.InternalServerError).json({
        status: StatusCode.InternalServerError,
        message: 'Internal Server Error',
      });
    }
  };
  getOrder = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const getOrderResponse = await this.service.getOrder(id);
      res.status(StatusCode.OK).json({order:getOrderResponse});
    } catch {
      res.status(StatusCode.InternalServerError).json({
        status: StatusCode.InternalServerError,
        message: 'Internal Server Error',
      });
    }
  };
  editOrder = async (req: Request, res: Response) => {
    try {
      const _id = req.params.id as string;

      const getOrderResponse = await this.service.editOrder({
        _id,
        status: req.body.status,
      });
      res.status(StatusCode.OK).json({order:getOrderResponse});
    } catch {
      res.status(StatusCode.InternalServerError).json({
        status: StatusCode.InternalServerError,
        message: 'Internal Server Error',
      });
    }
  };
}
