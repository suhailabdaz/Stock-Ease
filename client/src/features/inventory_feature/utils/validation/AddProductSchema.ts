import * as Yup from 'yup';

export const AddProductSchema = Yup.object({
  title: Yup.string()
    .required('Product name is required')
    .min(3, 'Product name must be at least 3 characters'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
  image: Yup.mixed()
    .required('Image is required')
    .test('fileType', 'Only JPG or PNG images are allowed', (value) => {
      return value && value instanceof File && (value.type === 'image/jpeg' || value.type === 'image/png');
    })
    .test('fileSize', 'File size cannot exceed 10MB', (value) => {
      return value && value instanceof File && value.size <= 10 * 1024 * 1024; // 10MB in bytes
    }),
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
