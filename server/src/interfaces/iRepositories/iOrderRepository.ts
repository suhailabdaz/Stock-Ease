import { ReqOrder, ResOrder } from "../interface";

export default interface IOrderRepository {
  findOrder(id: string): Promise<ResOrder | null >;
  getAllOrders(): Promise<ResOrder[] | null>;
  saveOrder(customer: ReqOrder): Promise<ResOrder | null >;
  editOrder(id:string,status: string): Promise<ResOrder | null >;
}