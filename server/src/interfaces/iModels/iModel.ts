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