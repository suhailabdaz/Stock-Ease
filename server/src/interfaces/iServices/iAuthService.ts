import {registerRequest,registerResponse} from '../iDTOs/iAuthDTO'

export default interface iAuthService {
  register(data:registerRequest ): Promise<registerResponse>;
}