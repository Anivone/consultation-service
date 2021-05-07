import { IAccount, IUser } from "../../domain/entities/types";

export interface UserAccount extends Omit<IUser, '_id'>, Omit<IAccount, '_id'> {
}

export interface IUserService {

    signup(props: UserAccount): Promise<UserAccount>;

    login(email: string, password: string): Promise<UserAccount>;

}