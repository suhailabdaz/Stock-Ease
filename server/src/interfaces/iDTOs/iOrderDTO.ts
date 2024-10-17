import {ReqOrder, ResOrder,StatusMessage} from "../interface" 

export type CreateOrderReq = ReqOrder

export type CreateOrderResponse = ResOrder

export type GetOrderReq = string

export type GetOrderResponse  = ResOrder

export type AllOrdersReq = null

export type AllOrdersResponse = ResOrder[]

export interface EditOrderReq{
  _id:string,
  status:string
}

export type EditOrderREsponse = ResOrder


export type ErrorRes = StatusMessage


