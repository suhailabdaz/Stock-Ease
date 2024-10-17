import { FieldProps } from 'formik';


export interface CreateOrderFormValues {
  productid: string;
  customerid: string;
  paymentmethod:string;
  price: number;
  status:string;
}

export interface CustomTextFieldProps extends FieldProps {
  label: string;
  placeholder?: string;
  type?: string;
}

export interface CreateOrderResponse {
  status:number
  message:string
}

export interface Customer{
  _id:string
  name: string;
  address: string;
  pincode:string;
  mobile: string;
  status:string;
} 

export interface AllCustomersResponse extends CreateOrderResponse {
  customers : Customer[]
}

export interface EditOrderRequest{
  _id:string,
  status:string
}

export interface Order extends CreateOrderFormValues{
  _id:string
  orderid:string
}

export interface SingleOrderResponse extends CreateOrderResponse{
  order:Order
}


export interface AllOrderResponse extends CreateOrderResponse {
  orders : Order[]
}
export interface Product {
  _id:string;
  title: string;
  description: string;
  category:string;
  publishing:[]
  stock: number;
  price: number;
  status:string
}
export interface AllProductsResponse extends CreateOrderResponse {
  products : Product[]
}

