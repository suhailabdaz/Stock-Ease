import { FieldProps } from 'formik';


export interface AddProductFormValues {
  title: string;
  description: string;
  image: File; // File type for image input
  stock: number;
  price: number;
}

export interface CustomTextFieldProps extends FieldProps {
  label: string;
  placeholder: string;
  type?: string;
}
