import {ReqOrder, ResOrder,StatusMessage} from "../interface" 

export type CreateOrderReq = ReqOrder

export type CreateOrderResponse = ResOrder

export interface GetOrderReq {
  vendorid:string,
  id:string
}

export type GetOrderResponse  = ResOrder

export type AllOrdersReq = string

export type AllOrdersResponse = ResOrder[]

export interface EditOrderReq{
  vendorid:string
  _id:string,
  status:string
}

export type EditOrderREsponse = ResOrder


export type ErrorRes = StatusMessage


