import {Customer, Customerwithid,StatusMessage} from "../interface" 

export type AddCustomerReq = Customer

export type AddCustomerResponse = StatusMessage

export type GetCustomerReq = string

export interface GetCustomerRes extends StatusMessage{
  customer:Customerwithid
}

export type AllCustomersReq = null

export interface AllCustomersRes extends StatusMessage {
  customers:Customerwithid[]
}

export interface EditCustomerReq{
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


