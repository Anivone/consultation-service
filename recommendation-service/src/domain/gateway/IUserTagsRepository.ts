import { IUserTags } from "../entities/types";

export interface IUserTagsRepository {

    getUserTags(filter?: any): Promise<IUserTags[]>;

    getUserTagsById(userID: string): Promise<IUserTags>;

    createUserTags(userProps: IUserTags): Promise<IUserTags>;

    updateUserTags(userID: string, updateProps: any): Promise<IUserTags>;

    deleteUserTags(userID: string): Promise<IUserTags>;

}