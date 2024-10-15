import { FieldProps } from 'formik';


import { User } from "../../../types/user";

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface otpformValues{
  email:string
  otp:string
}

export interface SignupFormValues {
  name:string,
  email: string;
  password: string;
}

export interface CustomTextFieldProps extends FieldProps {
  label: string;
  placeholder: string;
  type?: string;
}

export interface RegistrationResponse  {
  message: string;
  data: User
};

export interface RegistrationData  {
  name:string,
  email:string,
  password:string
}
