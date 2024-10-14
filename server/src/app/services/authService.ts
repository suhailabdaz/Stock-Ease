import { StatusCode } from '../../enums/statusCodes';
import {
  registerRequest,
  registerResponse,
} from '../../interfaces/iDTOs/iAuthDTO';
import { User } from '../../interfaces/interface';
import IUserRepository from '../../interfaces/iRepositories/iUserRepository';
import iAuthService from '../../interfaces/iServices/iAuthService';
import UserRepository from '../repository/userRepository';

const repository = new UserRepository();

export default class AuthService implements iAuthService {
  private repository: IUserRepository;
  constructor() {
    this.repository = repository;
  }
  async register(data: registerRequest):Promise<registerResponse> {
    try {
      const existingUser = await this.repository.findUser(data.email);

      if (existingUser)
        return {
          status:StatusCode.Conflict as number,
          message: "user laready exists",
        };
        else {
          const saveUser = await this.repository.saveUser(data);
          if (saveUser) {
              return { status: StatusCode.Created as number, message: "User created successfully",userData:saveUser };
          } else {
              return {status: StatusCode.InternalServerError as number, message: "Failed to save user" };
          }
        }
    } catch (error) {
      return {
        status: StatusCode.InternalServerError as number,
        message: 'Internal Server Error',
      };
    }
  };
}
