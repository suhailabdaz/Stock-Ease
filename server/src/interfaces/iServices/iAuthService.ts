import {loginRequest, loginResponse, registerRequest,registerResponse, verifyRequest} from '../iDTOs/iAuthDTO'
import { StatusMessage, User } from '../interface';

export default interface iAuthService {
  register(data:User ): Promise<StatusMessage>;
  verifyOtp(data:verifyRequest):Promise<StatusMessage>
  login(data:loginRequest):Promise<loginResponse | StatusMessage>
}