import * as jwt from 'jsonwebtoken';
import * as bcrypt from "bcrypt";
import to from "await-to-js";
import { IUserService } from "./types";
import { CreateAccount } from "../../domain/use-cases/account/CreateAccount";
import { CreateUser } from "../../domain/use-cases/user/CreateUser";
import { IAccount, IUser, Role } from "../../domain/entities/types";
import { GetAccounts } from "../../domain/use-cases/account/GetAccounts";
import { GetUserById } from "../../domain/use-cases/user/GetUserById";
import { UserAccount } from "../dto/IUserAccount";

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

    constructor({ createAccount, createUser, getUserById, getAccounts }: UserServiceProps) {
        this.createAccount = createAccount;
        this.createUser = createUser;
        this.getUserById = getUserById;
        this.getAccounts = getAccounts;
    }

    async authenticate(token: string): Promise<UserAccount> {
        const jwtPayload: any = jwt.verify(token, process.env.JWT_SECRET);

        let data;
        if (typeof jwtPayload == 'object') {
            data = jwtPayload.data;
        } else {
            throw new Error('JwtToken has no payload');
        }

        const [err, accountList] = await to<IAccount[]>(this.getAccounts.execute({ email: data.email }));
        if (err) throw err;

        if (!accountList[0]) throw new Error('User does not exist');

        const account = accountList[0];
        const [err2, user] = await to<IUser>(this.getUserById.execute(account.userID));

        if (err2) throw err2;

        return new UserAccount({
            ...user,
            ...account
        });
    }

    async login(email: string, password: string): Promise<UserAccount> {
        const [err, accountList] = await to<IAccount[]>(this.getAccounts.execute({ email: email }));
        if (err) throw err;

        if (!accountList[0]) throw new Error('User does not exist');

        const account = accountList[0];

        if (!await this.isValidPassword(password, account)) throw new Error('Password is not correct');

        const [err2, user] = await to<IUser>(this.getUserById.execute(account.userID));

        if (err2) throw err2;

        return new UserAccount({
            ...user,
            ...account
        })

    }

    async signup(props: UserAccount): Promise<UserAccount> {
        const [err, user] = await to<IUser>(
            this.createUser.execute(props)
        );
        if (err) throw err;

        const [err2, account] = await to<IAccount>(
            this.createAccount.execute({
                email: props.email,
                password: props.password,
                role: props.isConsultant ? Role.Consultant : Role.User,
                userID: user._id
            }));
        if (err2) throw err2;

        return new UserAccount({
            ...user,
            ...account
        })
    }

    async isValidPassword(password: string, account: IAccount) {
        return await bcrypt.compare(password, account.password);
    }

}