import * as Yup from 'yup';

export const AddCustomerSchema = Yup.object({
  name: Yup.string()
    .required('Customer name is required')
    .min(3, 'Customer name must be at least 3 characters'),
  address: Yup.string()
    .required('address is required')
    .min(5, 'Description must be at least 10 characters'),
    pincode: Yup.string()
    .matches(/^[0-9]+$/, 'Pincode must be a number')
    .required('Pincode is required')
    .min(6, 'Pincode must be exactly 6 characters')
    .max(6, 'Pincode must be exactly 6 characters'),
  mobile: Yup.string()
    .matches(/^[0-9]+$/, 'Mobile number must be a number')
    .required('Mobile number is required')
    .min(10, 'Mobile number must be exactly 10 characters')
    .max(10, 'Mobile number must be exactly 10 characters'),
    status: Yup.string()
    .required('Status is required'),
});
