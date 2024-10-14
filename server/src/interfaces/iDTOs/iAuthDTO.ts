import {User} from "../interface" 

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
