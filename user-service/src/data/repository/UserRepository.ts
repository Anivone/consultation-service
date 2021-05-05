import { IUserRepository } from "../../domain/gateway/IUserRepository";
import { IUser } from "../../domain/entities/types";
import { IUserDocument, IUserModel } from "../schemas/UserSchema";
import to from "await-to-js";

interface UserRepositoryProps {
    UserModel: IUserModel;
}

export class UserRepository implements IUserRepository {

    UserModel: IUserModel;

    constructor({ UserModel } : UserRepositoryProps) {
        this.UserModel = UserModel;
    }

    async createUser(userProps: IUser): Promise<IUserDocument> {
        const [err, user] = await to<IUserDocument>(new this.UserModel({
            firstName: userProps.firstName,
            lastName: userProps.lastName,
            middleName: userProps.middleName,
            phoneNumber: userProps.phoneNumber,
            location: userProps.location,
            description: userProps.description,
            posts: userProps.posts,
            comments: userProps.comments,
            isConsultant: userProps.isConsultant,
            position: userProps.position,
            consultationsNumber: userProps.consultationsNumber,
            reviewsNumber: userProps.reviewsNumber,
            ratingID: userProps.ratingID,
        }).save());

        if (err) throw new Error(err.message);

        return user;
    }

    async deleteUser(userID: string): Promise<IUserDocument> {
        return this.UserModel.findByIdAndRemove(userID);
    }

    async getUserById(userID: string): Promise<IUserDocument> {
        return this.UserModel.findById(userID);

    }

    async getUsers(filter?: any): Promise<IUserDocument[]> {
        return this.UserModel.find(filter);
    }

    async updateUser(userID: string, updateProps: any): Promise<IUserDocument> {
        return this.UserModel.findByIdAndUpdate(userID, updateProps);
    }

}