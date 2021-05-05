import { User } from "../entities/User";
import { IUser } from "../entities/types";

export interface IUserRepository {

    getUsers(filter?: any): Promise<User[]>;

    getUserById(postID: string): Promise<User>;

    createUser(postProps: IUser): Promise<User>;

    updateUser(postID: string, updateProps: any): Promise<User>;

    deleteUser(postID: string): Promise<User>;
    
}