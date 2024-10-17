import {Product, Productwithid,StatusMessage} from "../interface" 

export type AddProductReq = Product

export type AddProductResponse = StatusMessage

export type GetProductReq = string

export interface GetProductRes extends StatusMessage{
  product:Productwithid
}

export type AllProductsReq = null

export interface AllProductsRes extends StatusMessage {
  products:Productwithid[]
}

export interface EditProductReq{
  _id:string,
  product:Product
}

export interface EditProductRes extends StatusMessage{
  product:Productwithid
}

export type BlockProductReq = string

export interface BlockProductRes{
  statusmessage :StatusMessage
  product:Productwithid
}

export type ErrorRes = StatusMessage


