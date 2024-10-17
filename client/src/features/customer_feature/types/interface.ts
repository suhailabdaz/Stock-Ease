import { FieldProps } from 'formik';


export interface AddCustomerFormValues {
  name: string;
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
  _id:string,
  customer:AddCustomerFormValues
}

export interface Customer extends AddCustomerFormValues{
  _id:string
}

export interface SingleCustomerResponse extends AddCustomerResponse{
  customer:Customer
}


export interface AllCustomersResponse extends AddCustomerResponse {
  customers : Customer[]
}

