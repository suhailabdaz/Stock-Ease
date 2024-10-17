import  { Document } from "mongoose";

export interface UserInterface extends Document {
  name:string,
  email:string,
  password:string,
}

export interface ProductInterface extends Document {
  title: string;
  description: string;
  category:string;
  publishing:[string]
  stock: number;
  price: number;
  status:string
}

export interface CustomerInterface extends Document {
  name: string;
  address: string;
  pincode:string;
  mobile:string;
  status:string
}