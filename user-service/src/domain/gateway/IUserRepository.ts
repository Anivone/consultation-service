import { IUser } from "../entities/types";

export interface IUserRepository {

    getUsers(filter?: any): Promise<IUser[]>;

    getUserById(postID: string): Promise<IUser>;

    createUser(postProps: IUser): Promise<IUser>;

    updateUser(postID: string, updateProps: any): Promise<IUser>;

    deleteUser(postID: string): Promise<IUser>;
    
}