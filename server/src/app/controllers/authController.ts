import { Request, Response } from 'express';
import AuthService from '../services/authService';
import iAuthService from '../../interfaces/iServices/iAuthService';
import { StatusCode } from '../../enums/statusCodes';
import { registerResponse } from '../../interfaces/iDTOs/iAuthDTO';

const service = new AuthService()

export default class AuthController {

  private service: iAuthService;

  constructor() {
    this.service = new AuthService();
  }

  userRegister = async(req: Request, res: Response) => {
    try {
      const registerResponse:registerResponse = await this.service.register(req.body) as registerResponse 
      res.status(registerResponse?.status).json(registerResponse)
   } catch (error) {
       console.log(error);
      res.status(StatusCode.InternalServerError).json({ message: 'Internal Server Error' }); 
   }
  }
}
