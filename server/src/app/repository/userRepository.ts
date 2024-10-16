import UserModel from '../../models/userModel';
import { User, userWithId } from '../../interfaces/interface';
import IUserRepository from '../../interfaces/iRepositories/iUserRepository';
import { hashPassword } from '../../utils/passwordHashing';

export default class UserRepository implements IUserRepository {
  findUser = async (email: string): Promise<userWithId | null> => {
    try {
        const user = await UserModel.findOne({ email }).exec();
        return user as userWithId | null;
    } catch (error) {
        console.error("Error finding user:", error);
        return null;
    }
}
saveUser = async (data: User): Promise<userWithId | null> => {
  try {
      const { otp, ...userWithoutOtp } = data;
      userWithoutOtp.password = await hashPassword(data.password);
      console.log(userWithoutOtp,"ithu pass");
      const user = new UserModel(userWithoutOtp);
      const savedUser = await user.save() as userWithId
      return savedUser;
  } catch (error) {
      console.error("Error finding user:", error);
      return null;
  }
}
}
