import {
  CreateOrderReq,
  CreateOrderResponse,
  AllOrdersReq,
  AllOrdersResponse,
  EditOrderReq,
  EditOrderREsponse,
  GetOrderResponse,
  GetOrderReq,
} from '../../interfaces/iDTOs/iOrderDTO';
import IOrderRepository from '../../interfaces/iRepositories/iOrderRepository';
import IOrderService from '../../interfaces/iServices/iOrderService';
import OrerRepository from '../repository/orderRepository';

const repository = new OrerRepository();

export default class OrderService implements IOrderService {
  private repository: IOrderRepository;
  constructor() {
    this.repository = repository;
  }
  async createOrder(
    data: CreateOrderReq
  ): Promise<CreateOrderResponse | null> {
    try {
      const AddOrder = await this.repository.saveOrder(data);
      if (AddOrder) {
        return AddOrder
      } else {
        return null
      }
    } catch {
      return null
    }
  }
  async getAllOrders(
    data: AllOrdersReq
  ): Promise<AllOrdersResponse | null> {
    try {
      const AllOrders = await this.repository.getAllOrders(data);
      if (AllOrders) {
        return AllOrders
      } else {
        return null
      }
    } catch {
      return null
    }
  }

  async editOrder(data: EditOrderReq): Promise<EditOrderREsponse | null> {
    try {   
      
      const Order = await this.repository.editOrder(data.vendorid,data._id,data.status);
      if (Order) {
        return Order
      } else {
        return null
      }
    } catch {
      return null
    }
    }
  async getOrder(
    data: GetOrderReq
  ): Promise<GetOrderResponse | null> {
    try {
      const Order = await this.repository.findOrder(data.vendorid,data.id);
      if (Order) {
        return Order
      } else {
        return null
      }
    } catch {
      return null
    }
  }
  
}
