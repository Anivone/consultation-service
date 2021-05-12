import { IUser } from "../entities/types";

export interface IPostUserRepository {

    getUsers(filter?: any): Promise<IUser[]>;

    getUserById(userID: string): Promise<IUser>;

    createUser(userProps: IUser): Promise<IUser>;

    updateUser(userID: string, updateProps: any): Promise<IUser>;

    deleteUser(userID: string): Promise<IUser>;
    
}