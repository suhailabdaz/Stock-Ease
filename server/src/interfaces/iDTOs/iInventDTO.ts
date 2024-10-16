import {Product, Productwithid,StatusMessage} from "../interface" 

export type AddProductReq = Product
export type AddProductResponse = StatusMessage

export type GetProductReq = string

export interface GetProductRes{
  statusmessage : StatusMessage
  product:Productwithid
}

export type AllProductsReq = null

export interface AllProductsRes {
  statusMessage:StatusMessage
  products:[Productwithid]
}

export interface EditProductReq{
  _id:string,
  product:Productwithid
}

export interface EditProductRes{
  statusmessage:StatusMessage
  product:Productwithid
}

export type BlockProductReq = string

export interface BlockProductRes{
  statusmessage :StatusMessage
  product:Productwithid
}

export interface ErrorRes {
  statusmessage:StatusMessage
}


