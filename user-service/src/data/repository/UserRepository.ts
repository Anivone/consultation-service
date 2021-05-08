import { IUserRepository } from "../../domain/gateway/IUserRepository";
import { IAccount, IUser } from "../../domain/entities/types";
import { IUserModel } from "../schemas/UserSchema";
import to from "await-to-js";
import { User } from "../../domain/entities/User";

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
            position: userProps.position,
            consultationsNumber: userProps.consultationsNumber,
            ratingID: userProps.ratingID,
        }).save());

        if (err) throw err;

        return new User(user);
    }

    async deleteUser(userID: string): Promise<IUser> {
        return new User(await this.UserModel.findByIdAndRemove(userID));
    }

    async getUserById(userID: string): Promise<IUser> {
        return new User(await this.UserModel.findById(userID));
    }

    async getUsers(filter?: any): Promise<IUser[]> {
        const users = await this.UserModel.find(filter);
        return users.map(user => new User(user));
    }

    async updateUser(userID: string, updateProps: any): Promise<IUser> {
        return new User(await this.UserModel.findByIdAndUpdate(userID, updateProps));
    }

}