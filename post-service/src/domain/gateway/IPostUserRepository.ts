import { IPostUser } from "../entities/types";

export interface IPostUserRepository {

    getPostUsers(filter?: any): Promise<IPostUser[]>;

    getPostUserById(userID: string): Promise<IPostUser>;

    createPostUser(userProps: IPostUser): Promise<IPostUser>;

    updatePostUser(userID: string, updateProps: any): Promise<IPostUser>;

    deletePostUser(userID: string): Promise<IPostUser>;
    
}