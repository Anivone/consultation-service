import { IPostUserRepository } from "../../domain/gateway/IPostUserRepository";
import { IPostUser } from "../../domain/entities/types";
import { IPostUserModel } from "../schemas/PostUserSchema";
import to from "await-to-js";

interface PostUserRepositoryProps {
    PostUserModel: IPostUserModel;
}

export class PostUserRepository implements IPostUserRepository {

    PostUserModel: IPostUserModel;

    constructor({ PostUserModel } : PostUserRepositoryProps) {
        this.PostUserModel = PostUserModel;
    }

    async createPostUser(userProps: IPostUser): Promise<IPostUser> {
        const [err, user] = await to<IPostUser>(new this.PostUserModel({
            userID: userProps.userID,
            firstName: userProps.firstName,
            lastName: userProps.lastName,
            isConsultant: userProps.isConsultant,
            specialtyID: userProps.specialtyID,
            ratingID: userProps.ratingID,
        }).save());

        if (err) throw err;

        return this.PostUserModel.toPostUser(user);
    }

    async deletePostUser(userID: string): Promise<IPostUser> {
        return this.PostUserModel.toPostUser(await this.PostUserModel.findByIdAndRemove(userID));
    }

    async getPostUserById(userID: string): Promise<IPostUser> {
        return this.PostUserModel.toPostUser(await this.PostUserModel.findById(userID));
    }

    async getPostUsers(filter?: any): Promise<IPostUser[]> {
        const users = await this.PostUserModel.find(filter);
        return users.map(user => this.PostUserModel.toPostUser(user));
    }

    async updatePostUser(userID: string, updateProps: any): Promise<IPostUser> {
        return this.PostUserModel.toPostUser(await this.PostUserModel.findByIdAndUpdate(userID, updateProps));
    }

}