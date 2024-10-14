import mongoose from 'mongoose';
import UserModel from '../../models/userModel';
import { User } from '../../interfaces/interface';
import IUserRepository from '../../interfaces/iRepositories/iUserRepository';

export default class UserRepository implements IUserRepository {
  findUser = async (email: string): Promise<User | null> => {
    try {
        const user = await UserModel.findOne({ email }).exec();
        return user as User | null;
    } catch (error) {
        console.error("Error finding user:", error);
        return null;
    }
}
saveUser = async (user: User): Promise<User | null> => {
  try {
      const userData = new UserModel(user);
      const savedUser = await userData.save() as User
      return savedUser;
  } catch (error) {
      console.error("Error finding user:", error);
      return null;
  }
}
}
