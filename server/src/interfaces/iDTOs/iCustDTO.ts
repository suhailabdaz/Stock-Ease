import {Customer, Customerwithid,StatusMessage} from "../interface" 

export type AddCustomerReq = Customer

export type AddCustomerResponse = StatusMessage

export interface GetCustomerReq 
{
  vendorid:string,
  id:string
}

export interface GetCustomerRes extends StatusMessage{
  customer:Customerwithid
}

export type AllCustomersReq = string

export interface AllCustomersRes extends StatusMessage {
  customers:Customerwithid[]
}

export interface EditCustomerReq{
  vendorid:string,
  _id:string,
  customer:Customer
}

export interface EditCustomerRes extends StatusMessage{
  customer:Customerwithid
}

export type BlockCustomerReq = string

export interface BlockCustomerRes{
  statusmessage :StatusMessage
  customer:Customerwithid
}

export type ErrorRes = StatusMessage


