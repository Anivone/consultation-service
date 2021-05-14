import { IUserRepository } from "../../domain/gateway/IUserRepository";
import { IUser } from "../../domain/entities/types";
import { IUserModel } from "../schemas/UserSchema";
import to from "await-to-js";

interface UserRepositoryProps {
    UserModel: IUserModel;
}

export class UserRepository implements IUserRepository {

    UserModel: IUserModel;

    constructor({ UserModel } : UserRepositoryProps) {
        this.UserModel = UserModel;
    }

    async createUser(userProps: IUser): Promise<IUser> {
        const [err, user] = await to<IUser>(new this.UserModel({
            firstName: userProps.firstName,
            lastName: userProps.lastName,
            middleName: userProps.middleName,
            phoneNumber: userProps.phoneNumber,
            location: userProps.location,
            description: userProps.description,
            posts: userProps.posts,
            comments: userProps.comments,
            isConsultant: userProps.isConsultant,
            specialtyID: userProps.specialtyID,
            consultationsNumber: userProps.consultationsNumber,
            ratingID: userProps.ratingID,
        }).save());
        console.log('[X] createUser user: ', user);
        if (err) throw err;

        return this.UserModel.toUser(user);
    }

    async deleteUser(userID: string): Promise<IUser> {
        return this.UserModel.toUser(await this.UserModel.findByIdAndRemove(userID));
    }

    async getUserById(userID: string): Promise<IUser> {
        return this.UserModel.toUser(await this.UserModel.findById(userID));
    }

    async getUsers(filter?: any): Promise<IUser[]> {
        const users = await this.UserModel.find(filter);
        return users.map(user => this.UserModel.toUser(user));
    }

    async updateUser(userID: string, updateProps: any): Promise<IUser> {
        return this.UserModel.toUser(await this.UserModel.findByIdAndUpdate(userID, updateProps));
    }

}