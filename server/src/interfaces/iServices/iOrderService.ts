import {CreateOrderReq,CreateOrderResponse,AllOrdersReq,AllOrdersResponse,EditOrderReq
  ,EditOrderREsponse,GetOrderReq,GetOrderResponse
  } from '../iDTOs/iOrderDTO'
  
  export default interface iOrderService {
    createOrder(data:CreateOrderReq):Promise< CreateOrderResponse| null>
    getAllOrders(data:AllOrdersReq):Promise<AllOrdersResponse | null>
    editOrder(data:EditOrderReq):Promise<EditOrderREsponse | null>
    getOrder(data:GetOrderReq):Promise<GetOrderResponse | null>
  }