import { FieldProps } from 'formik';



export interface LoginFormValues {
  email: string;
  password: string;
}

export interface CustomTextFieldProps extends FieldProps {
  label: string;
  placeholder: string;
  type?: string;
}
