import mongoose,{ Types } from 'mongoose';


export  interface User {
  name: string ;
  email: string;
  password :string;
  otp? :string
}

export interface DecodedToken {
  userId: string;
  id: string;
}

export interface userWithId{
  _id:Types.ObjectId;
  name :string,
  email:string,
  password:string
}


export interface StatusMessage{
  status: number; 
  message: string ;

}

export interface ItokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite?: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
  domain?: string;
  path?:string
}
