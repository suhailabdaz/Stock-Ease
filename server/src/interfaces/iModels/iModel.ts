import  { Document } from "mongoose";

export interface UserInterface extends Document {
  name:string,
  email:string,
  password:string,
}

export interface ProductInterface extends Document {
  vendorid:string;
  title: string;
  description: string;
  category:string;
  publishing:[string]
  stock: number;
  price: number;
  status:string
}

export interface CustomerInterface extends Document {
  vendorid:string;
  name: string;
  address: string;
  pincode:string;
  mobile:string;
  status:string
}


export interface OrderInterface extends Document {
  vendorid:string;
  orderid:string;
  productid: string;
  customerid: string;
  paymentmethod:string;
  price: number;
  status:string;
}