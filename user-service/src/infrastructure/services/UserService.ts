import * as jwt from 'jsonwebtoken';
import * as bcrypt from "bcrypt";
import to from "await-to-js";
import { IUserService, Vote } from "./types";
import { CreateAccount } from "../../domain/use-cases/account/CreateAccount";
import { CreateUser } from "../../domain/use-cases/user/CreateUser";
import { IAccount, IRating, IUser, Role } from "../../domain/entities/types";
import { GetAccounts } from "../../domain/use-cases/account/GetAccounts";
import { GetUserById } from "../../domain/use-cases/user/GetUserById";
import { UserAccount } from "../dto/IUserAccount";
import { createUsers } from "../tools/CreateUsers";
import { DeleteUser } from "../../domain/use-cases/user/DeleteUser";
import { DeleteAccountByUserId } from "../../domain/use-cases/account/DeleteAccountByUserId";
import { deleteUsers } from "../tools/DeleteUsers";
import { PromoteUser } from "../../domain/use-cases/user/PromoteUser";
import { promoteUsers } from "../tools/PromoteUsers";
import { CreateRating } from "../../domain/use-cases/rating/CreateRating";
import { UpdateRating } from "../../domain/use-cases/rating/UpdateRating";
import { voteRatings } from "../tools/VoteRatings";
import { GetRatingById } from "../../domain/use-cases/rating/GetRatingById";

interface UserServiceProps {
    createAccount: CreateAccount;
    createUser: CreateUser;
    getUserById: GetUserById;
    getAccounts: GetAccounts;
    deleteUser: DeleteUser;
    deleteAccountByUserId: DeleteAccountByUserId;
    promoteUser: PromoteUser;
    createRating: CreateRating;
    updateRating: UpdateRating
    getRatingById: GetRatingById;
}

interface PromoteProps {
    specialtyID: string;
}

export class UserService implements IUserService {

    private createAccount: CreateAccount;
    private createUser: CreateUser;
    private getUserById: GetUserById;
    private getAccounts: GetAccounts;
    private deleteUser: DeleteUser;
    private deleteAccountByUserId: DeleteAccountByUserId;
    private promoteUser: PromoteUser;
    private createRating: CreateRating;
    private updateRating: UpdateRating;
    private getRatingById: GetRatingById;

    constructor({
                    createAccount,
                    createUser,
                    getUserById,
                    getAccounts,
                    deleteAccountByUserId,
                    deleteUser,
                    promoteUser,
                    createRating,
                    updateRating,
                    getRatingById
                }: UserServiceProps) {
        this.createAccount = createAccount;
        this.createUser = createUser;
        this.getUserById = getUserById;
        this.getAccounts = getAccounts;
        this.deleteAccountByUserId = deleteAccountByUserId;
        this.deleteUser = deleteUser;
        this.promoteUser = promoteUser;
        this.createRating = createRating;
        this.updateRating = updateRating;
        this.getRatingById = getRatingById;
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
            email: account.email,
            userID: user._id,
            role: account.role
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
            email: account.email,
            userID: user._id,
            role: account.role
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

        const [err3, rating] = await to<IRating>(
            this.createRating.execute({})
        )
        if (err3) throw err3;

        user.ratingID = rating._id;

        await createUsers(user);

        return new UserAccount({
            ...user,
            email: account.email,
            userID: user._id,
            role: account.role
        });
    }

    async delete(userID: string) {
        const [err, user] = await to<IUser>(this.deleteUser.execute(userID));
        if (err) throw err;

        await deleteUsers(userID);

        return user;
    }

    async promote(userID: string, updateProps: PromoteProps) {
        const [err, user] = await to<IUser>(this.promoteUser.execute({ id: userID, updateProps }));
        if (err) throw err;

        await promoteUsers(user);

        return user;
    }

    async isValidPassword(password: string, account: IAccount) {
        return await bcrypt.compare(password, account.password);
    }

    async vote(userID: string, vote: Vote) {
        let voteNum;

        switch (vote) {
            case 1:
                voteNum = 'one';
                break;
            case 2:
                voteNum = 'two';
                break;
            case 3:
                voteNum = 'three';
                break;
            case 4:
                voteNum = 'four';
                break;
            case 5:
                voteNum = 'five';
                break;
        }

        const [err, rating] = await to<IRating>(this.updateRating.execute({
            id: userID,
            updateProps: {
                $inc: {
                    [voteNum]: 1,
                }
            }
        }));
        if (err) throw err;

        const [err2, newRating] = await to<IRating>(this.getRatingById.execute(rating._id));
        if (err2) throw err2;

        await voteRatings(userID, newRating);

        return newRating;
    }

}