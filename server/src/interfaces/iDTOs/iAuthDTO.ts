import {User, userWithId} from "../interface" 

export interface registerRequest{
  name :string,
  email:string,
  password:string
}

export interface registerResponse{
  status: number,
  message:string,
  userData?:User | null
}

export interface verifyRequest{
  email:string;
  otp:string
}

export interface loginResponse{
  status: number,
  message:string,
  data:
  {user:userWithId;
  accessToken: string;
  refreshToken:string;
}
}

export interface loginRequest{
  email : string;
  password:string;
}

