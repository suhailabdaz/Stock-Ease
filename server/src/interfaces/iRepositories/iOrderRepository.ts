import { ReqOrder, ResOrder } from "../interface";

export default interface IOrderRepository {
  findOrder(vendorid:string,id: string): Promise<ResOrder | null >;
  getAllOrders(vendorid:string): Promise<ResOrder[] | null>;
  saveOrder(customer: ReqOrder): Promise<ResOrder | null >;
  editOrder(vendorid:string,id:string,status: string): Promise<ResOrder | null >;
}