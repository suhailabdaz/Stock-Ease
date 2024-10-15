import { FieldProps } from 'formik';
import { UserData } from '../../../types/user';

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
  status:number
  message: string;
};

export interface RegistrationData  {
  name:string,
  email:string,
  password:string
}

export interface verifyOtpReq{
  email:string,
  otp:string
}

export interface loginResponse{
  status: number,
  message:string,
  data:{user:UserData;
  accessToken: string;
  refreshToken:string;
}
}
