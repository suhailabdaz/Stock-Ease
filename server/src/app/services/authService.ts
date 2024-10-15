import { StatusCode } from '../../enums/statusCodes';
import {
  loginRequest,
  loginResponse,
  registerRequest,
  registerResponse,
  verifyRequest,
} from '../../interfaces/iDTOs/iAuthDTO';
import { StatusMessage, User, userWithId } from '../../interfaces/interface';
import IUserRepository from '../../interfaces/iRepositories/iUserRepository';
import iAuthService from '../../interfaces/iServices/iAuthService';
import JwtControllers from '../../services/jwt';
import { getUserData, otpSetData } from '../../services/redis';
import { comparePassword } from '../../utils/passwordHashing';
import { sendOtp } from '../../utils/sendMail';
import UserRepository from '../repository/userRepository';


const jwtController=new JwtControllers()


const repository = new UserRepository();

export default class AuthService implements iAuthService {
  private repository: IUserRepository;
  constructor() {
    this.repository = repository;
  }
  async register(data: User): Promise<StatusMessage> {
    try {
      const existingUser = await this.repository.findUser(data.email);
      console.log('data',data);
      
      if (existingUser)
        return {
          status: StatusCode.Conflict as number,
          message: 'User already exists',
        };

      const isOtpSended = await sendOtp(data.email, data.name);

      if (isOtpSended) {
        await otpSetData(data, isOtpSended);
        return {
          status: StatusCode.OK as number,
          message: 'Otp Sended Succesfully',
        };
      } else
        return {
          status: StatusCode.InternalServerError as number,
          message: 'Failed to send OTP',
        };
    } catch (error) {
      console.error('Error during registration:', error);

      return {
        status: StatusCode.InternalServerError as number,
        message: 'Internal Server Error',
      };
    }
  }

  verifyOtp = async (data: verifyRequest): Promise<StatusMessage> => {
    try {
      const userData = await getUserData(data.email);
      if (userData) {
        if (data.otp === userData.otp) {
          const saveUser = await this.repository.saveUser(userData);
          if (saveUser) {
            return {
              status: StatusCode.Created as number,
              message: 'User created successfully',
            };
          } else {
            return {
              status: StatusCode.InternalServerError as number,
              message: 'Failed to save user',
            };
          }
        } else {
          return {
            status: StatusCode.BadRequest as number,
            message: 'OTP does not match',
          };
        }
      } else {
        return {
          status: StatusCode.NotFound as number,
          message: 'Otp timed out',
        };
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
      return {
        status: StatusCode.InternalServerError as number,
        message: 'Internal Server Error',
      };
    }
  };

  login = async (data:loginRequest): Promise<loginResponse | StatusMessage > => {
    try {
        const existingUser = await this.repository.findUser(data.email) as userWithId | null
        if(existingUser){
            const isPasswordMatch=await comparePassword(data.password,existingUser.password)
            if(isPasswordMatch){
                const accessToken = await jwtController.createToken(existingUser._id.toString(),'15m', process.env.JWT_SECRET_KEY||"suhail",);
                const refreshToken = await jwtController.createToken(existingUser._id.toString(), '7d',process.env.JWT_REFRESH_SECRET_KEY||"suhailRefresh");
                return {
                    status: StatusCode.OK as number,
                    message: "Login successful",
                    data: {
                        user: existingUser,
                        accessToken,
                        refreshToken
                    }
                };
                }else{
                return { status: StatusCode.BadRequest as number, message: "Password does not match" }
            }
        }else{
            return { status: StatusCode.NotFound as number, message: "User Not Found" }
        }
    } catch (error) {
        console.error("Error during registration:", error);
        return { status: StatusCode.InternalServerError as number, message: "Internal Server Error" };
    }
}

}
