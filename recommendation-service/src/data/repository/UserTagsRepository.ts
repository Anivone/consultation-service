import { IUserTagsRepository } from "../../domain/gateway/IUserTagsRepository";
import { IUserTags } from "../../domain/entities/types";
import { IUserTagsModel } from "../schemas/UserTagsSchema";
import to from "await-to-js";
import { UserTags } from "../../domain/entities/UserTags";

interface UserTagsRepositoryProps {
    UserTagsModel: IUserTagsModel;
}

export class UserTagsRepository implements IUserTagsRepository {

    UserTagsModel: IUserTagsModel;

    constructor({ UserTagsModel }: UserTagsRepositoryProps) {
        this.UserTagsModel = UserTagsModel;
    }

    async createUserTags(userTagsProps: IUserTags): Promise<UserTags> {
        const [err, userTags] = await to<IUserTags>(new this.UserTagsModel({
            userID: userTagsProps.userID,
            tags: userTagsProps.tags,
        }).save());

        if (err) throw err;
        console.log('[X] userTags: ' ,userTags)

        return this.UserTagsModel.toUserTags(userTags);
    }

    async deleteUserTags(userTagsID: string): Promise<UserTags> {
        return this.UserTagsModel.toUserTags(await this.UserTagsModel.findByIdAndRemove(userTagsID));
    }

    async getUserTagsById(userTagsID: string): Promise<UserTags> {
        return this.UserTagsModel.toUserTags(await this.UserTagsModel.findById(userTagsID));
    }

    async getUserTags(filter?: any): Promise<UserTags[]> {
        const userTags: IUserTags[] = await this.UserTagsModel.find(filter);

        return userTags.map(userTags => this.UserTagsModel.toUserTags(userTags));
    }

    async updateUserTags(userTagsID: string, updateProps: any): Promise<UserTags> {
        return this.UserTagsModel.toUserTags(
            await this.UserTagsModel.findByIdAndUpdate(userTagsID, updateProps));
    }

}