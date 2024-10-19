import { FieldProps } from 'formik';


export interface AddCustomerFormValues {
  name: string;
  vendorid:string;
  address: string;
  pincode:string;
  mobile: string;
  status:string;
}

export interface CustomTextFieldProps extends FieldProps {
  label: string;
  placeholder?: string;
  type?: string;
}

export interface AddCustomerResponse {
  status:number
  message:string
}

export interface EditCustomerRequest{
  vendorid:string,
  _id:string,
  customer:AddCustomerFormValues
}

export interface Customer extends AddCustomerFormValues{
  _id:string
}

export interface SingleCustomerResponse extends AddCustomerResponse{
  customer:Customer
}

export interface SingleCustRequest{
  vendorid:string,
  customerid:string,
}


export interface AllCustomersResponse extends AddCustomerResponse {
  customers : Customer[]
}

