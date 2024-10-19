import { FieldProps } from 'formik';


export interface AddProductFormValues {
  vendorid:string;
  title: string;
  description: string;
  category:string;
  publishing:[]
  stock: number;
  price: number;
  status:string 
}

export interface CustomTextFieldProps extends FieldProps {
  label: string;
  placeholder?: string;
  type?: string;
}

export interface AddProductResponse {
  status:number
  message:string
}

export interface EditProductRequest{
  vendorid:string,
  _id:string,
  product:AddProductFormValues
}

export interface Product extends AddProductFormValues{
  _id:string
}

export interface SingleProductResponse extends AddProductResponse{
  product:Product
}

export interface SingleProductRequest{
  vendorid:string;
  productid:string;
}


export interface AllProductsResponse extends AddProductResponse {
  products : Product[]
}

