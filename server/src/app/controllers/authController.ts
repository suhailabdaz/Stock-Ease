import { Request, Response } from 'express';
import AuthService from '../services/authService';
import iAuthService from '../../interfaces/iServices/iAuthService';
import { StatusCode } from '../../enums/statusCodes';
import { loginResponse, registerResponse } from '../../interfaces/iDTOs/iAuthDTO';
import { StatusMessage } from '../../interfaces/interface';

const service = new AuthService()

export default class AuthController {

  private service: iAuthService;

  constructor() {
    this.service = service;
  }

  userRegister = async(req: Request, res: Response) => {
    try {
      const registerResponse:StatusMessage = await this.service.register(req.body) as StatusMessage 
      res.status(registerResponse?.status).json(registerResponse)
   } catch (error) {
       console.log(error);
      res.status(StatusCode.InternalServerError).json({ message: 'Internal Server Error' }); 
   }
  }

  verifyOtp=async(req:Request,res:Response)=>{
    try {
       const verifyOtpResponse:StatusMessage= await this.service.verifyOtp(req.body) as StatusMessage 
       res.status(verifyOtpResponse?.status).json(verifyOtpResponse)
    } catch (error) {
        console.log(error);
        res.status(StatusCode.InternalServerError).json({ message: 'Internal Server Error' }); 
    }
}

login=async(req:Request,res:Response)=>{
  try {
      const loginResponse:loginResponse | StatusMessage= await this.service.login(req.body) as loginResponse |StatusMessage
      if ('status' in loginResponse) {
          res.status(loginResponse.status).json(loginResponse);
      } else {
          res.status(StatusCode.OK).json(loginResponse);
      }       
   } catch (error) {
      console.log(error);
      res.status(StatusCode.InternalServerError).json({ message: 'Internal Server Error' }); 
  }
}
}
