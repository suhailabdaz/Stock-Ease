import { User } from "../interface";

export default interface IUserRepository {
    findUser(email:string):Promise<User | null>
    saveUser(user:User):Promise<User | null>
}