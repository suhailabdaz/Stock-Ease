import * as Yup from 'yup';

export const AddProductSchema = Yup.object({
  title: Yup.string()
    .required('Product name is required')
    .min(3, 'Product name must be at least 3 characters'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
  category: Yup.string()
    .required('Category is required')
    .min(4, 'Category must be at least 4 characters'),
  status: Yup.string()
    .required('Status is required'),
  publishing: Yup.array()
    .min(1, 'At least one Publishing Channel is required')
    .required('Publishing status is required'),
  stock: Yup.number()
    .required('Stock is required')
    .min(0, 'Stock cannot be negative')
    .integer('Stock must be an integer'),
  price: Yup.number()
    .required('Price is required')
    .min(99, 'Price cannot less than 99')
    .test(
      'is-decimal',
      'Price must have up to 2 decimal places',
      value => value === undefined || /^\d+(\.\d{1,2})?$/.test(value.toString()) // Ensure boolean is returned
    ),
});
