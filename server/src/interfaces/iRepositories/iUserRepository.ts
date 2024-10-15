import { User, userWithId } from "../interface";

export default interface IUserRepository {
    findUser(email:string):Promise<userWithId | null>
    saveUser(user:User):Promise<userWithId | null>
}