import { ReqOrder, ResOrder } from '../../interfaces/interface';
import IOrderRepository from '../../interfaces/iRepositories/iOrderRepository';
import  OrderModel from '../../models/orderModel';
import ProductModel from '../../models/productModel'
import generateOrderId from '../../utils/orderIdGenerate';

export default class OrderRepository implements IOrderRepository {

  async getAllOrders(): Promise<ResOrder[] | null> {
    const orders = await OrderModel.find();
    return orders.length > 0 ? (orders as ResOrder[]) : null;
  }

  async saveOrder(order: ReqOrder): Promise<ResOrder | null> {
    try {
      const orderid = await generateOrderId();
      const theOrder  = {...order,orderid}
      const savedOrder = await OrderModel.create(theOrder);
      
      if (savedOrder) {
        const updatedProduct = await ProductModel.findByIdAndUpdate(
          savedOrder.productid,
          { $inc: { stock: -1 } },
          { new: true }
        );
        
        if (!updatedProduct) {
          console.error(`Failed to update stock for product ${savedOrder.productid}`);
        }
        
        return savedOrder as ResOrder;
      }
      
      return null;
    } catch (error) {
      console.error('Error saving order:', error);
      return null;
    }
  }

  async editOrder(id: string, status: string): Promise< ResOrder | null> {
    
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
    
    console.log(updatedOrder); // Log the updated order
    return updatedOrder ? (updatedOrder as ResOrder) : null;
}

  
  async findOrder(id: string): Promise<ResOrder | null> {
    const Order = await OrderModel.findById(id);
    return Order ? (Order as ResOrder) : (null as null);
  }
}
