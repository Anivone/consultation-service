import { IUserService, UserAccount } from "./types";
import { CreateAccount } from "../../domain/use-cases/account/CreateAccount";
import { CreateUser } from "../../domain/use-cases/user/CreateUser";
import { IAccount, IUser } from "../../domain/entities/types";
import to from "await-to-js";
import { GetAccounts } from "../../domain/use-cases/account/GetAccounts";
import * as bcrypt from "bcrypt";
import { GetUserById } from "../../domain/use-cases/user/GetUserById";

interface UserServiceProps {
    createAccount: CreateAccount;
    createUser: CreateUser;
    getUserById: GetUserById;
    getAccounts: GetAccounts;
}

export class UserService implements IUserService {

    private createAccount: CreateAccount;
    private createUser: CreateUser;
    private getUserById: GetUserById;
    private getAccounts: GetAccounts;

    constructor({createAccount, createUser, getUserById, getAccounts}: UserServiceProps) {
        this.createAccount = createAccount;
        this.createUser = createUser;
        this.getUserById = getUserById;
        this.getAccounts = getAccounts;
    }

    async login(email: string, password: string): Promise<UserAccount> {
        const [err, accountList] = await to<IAccount[]>(this.getAccounts.execute({email: email}));
        if (err) throw err;

        if (!accountList[0]) throw new Error('User does not exist');

        const account = accountList[0];

        if (!await this.isValidPassword(password, account)) throw new Error('Password is not correct');

        const [err2, user] = await to<IUser>(this.getUserById.execute(account.userID));

        if (err2) throw err2;

        return {
            firstName: user.firstName,
            lastName: user.lastName,
            middleName: user.middleName,
            phoneNumber: user.phoneNumber,
            location: user.location,
            description: user.description,
            posts: user.posts,
            comments: user.comments,
            isConsultant: user.isConsultant,
            position: user.position,
            consultationsNumber: user.consultationsNumber,
            reviewsNumber: user.reviewsNumber,
            ratingID: user.ratingID,
            email: account.email,
            password: account.password,
            role: account.role,
            userID: user._id
        }

    }

    async signup(props: UserAccount): Promise<UserAccount> {
        const [err, user] = await to<IUser>(
            this.createUser.execute(props)
        );
        if (err) throw err;

        const [err2, account] = await to<IAccount>(
            this.createAccount.execute({ ...props, userID: user._id }));
        if (err2) throw err2;

        return {
            firstName: user.firstName,
            lastName: user.lastName,
            middleName: user.middleName,
            phoneNumber: user.phoneNumber,
            location: user.location,
            description: user.description,
            posts: user.posts,
            comments: user.comments,
            isConsultant: user.isConsultant,
            position: user.position,
            consultationsNumber: user.consultationsNumber,
            reviewsNumber: user.reviewsNumber,
            ratingID: user.ratingID,
            email: account.email,
            password: account.password,
            role: account.role,
            userID: user._id
        };
    }

    async isValidPassword(password: string, account: IAccount) {
        return await bcrypt.compare(password, account.password);
    }

}