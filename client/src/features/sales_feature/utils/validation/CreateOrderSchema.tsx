import * as Yup from 'yup';

export const CreateOrderSchema = Yup.object({
  customerid: Yup.string()
    .required('Customer  is required'),
  productid: Yup.string()
    .required('product is required'),
  paymentmethod: Yup.string()
    .required('method is required'),
  price: Yup.number()
    .required('Mobile number is required'),
  status: Yup.string()
    .required('Status is required'),
});
