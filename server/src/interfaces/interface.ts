

export  interface User {
  name: string ;
  email: string;
  password :string;
  otp? :string
}

export interface DecodedToken {
  userId: string;
  id: string;
}

export interface userWithId{
  _id:string;
  name :string,
  email:string,
  password:string
}


export interface StatusMessage{
  status: number; 
  message: string ;

}

export interface ItokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite?: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
  domain?: string;
  path?:string
}

export  interface Productwithid {
  _id:string;
  vendorid:string;
  title: string;
  description: string;
  category:string;
  publishing:[string];
  stock: number;
  price: number;
  status:string 
}

export  interface Product {
  vendorid:string,
  title: string;
  description: string;
  category:string;
  publishing:[string]
  stock: number;
  price: number;
  status:string 
}

export  interface Customerwithid {
  _id:string;
  vendorid:string,
  name: string;
  address: string;
  pincode:string;
  mobile: string;
  status:string 
}

export  interface Customer {
  vendorid:string,
  name: string;
  address: string;
  pincode:string;
  mobile: string;
  status:string 
}

export interface ReqOrder{
  productid: string;
  customerid: string;
  paymentmethod:string;
  price: number;
  status:string;
}

export interface ResOrder{
  _id:string;
  orderid:string;
  productid: string;
  customerid: string;
  paymentmethod:string;
  price: number;
  status:string;
}