import { Request, Response } from 'express';
import AuthService from '../services/authService';
import iAuthService from '../../interfaces/iServices/iAuthService';
import { StatusCode } from '../../enums/statusCodes';
import {
  loginResponse,
  registerResponse,
} from '../../interfaces/iDTOs/iAuthDTO';
import { StatusMessage } from '../../interfaces/interface';
import { generateTokenOptions } from '../../utils/generateTokenOptions';

const service = new AuthService();

export default class AuthController {
  private service: iAuthService;

  constructor() {
    this.login = this.login.bind(this); 
    this.service = service;
  }

  userRegister = async (req: Request, res: Response) => {
    try {
      const registerResponse: StatusMessage = (await this.service.register(
        req.body
      )) as StatusMessage;
      res.status(registerResponse?.status).json(registerResponse);
    } catch (error) {
      console.log(error);
      res
        .status(StatusCode.InternalServerError)
        .json({ message: 'Internal Server Error' });
    }
  };

  verifyOtp = async (req: Request, res: Response) => {
    try {
      const verifyOtpResponse: StatusMessage = (await this.service.verifyOtp(
        req.body
      )) as StatusMessage;
      res.status(verifyOtpResponse?.status).json(verifyOtpResponse);
    } catch (error) {
      console.log(error);
      res
        .status(StatusCode.InternalServerError)
        .json({ message: 'Internal Server Error' });
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const loginResponse: loginResponse | StatusMessage = await this.service.login(req.body);

      if ('status' in loginResponse && loginResponse.status !== StatusCode.OK) {
        return res.status(loginResponse.status).json(loginResponse);
      }

      if ('data' in loginResponse) {
        const options = generateTokenOptions();
        
        // Set cookies
        res.cookie(
          'token',
          loginResponse.data.token,
          options.accessTokenOptions
        );

        res.cookie(
          'refreshToken',
          loginResponse.data.refreshToken,
          options.refreshTokenOptions
        );

        const responseBody = {
          status: StatusCode.OK,
          message: loginResponse.message,
          data: {
            user: loginResponse.data.user
          }
        };

        // Send response
        return res.status(StatusCode.OK).json(responseBody);
      }

      // If we reach here, something unexpected happened
      throw new Error('Unexpected login response format');

    } catch (error) {
      console.error('Login error:', error);
      return res.status(StatusCode.InternalServerError).json({ message: 'Internal Server Error' });
    }
  };
}
