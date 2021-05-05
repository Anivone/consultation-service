import { IAccountRepository } from "../../domain/gateway/IAccountRepository";
import { IAccount } from "../../domain/entities/types";
import { IAccountDocument, IAccountModel } from "../schemas/AccountSchema";
import to from "await-to-js";

interface AccountRepositoryProps {
    AccountModel: IAccountModel;
}

export class AccountRepository implements IAccountRepository {

    AccountModel: IAccountModel;

    constructor({ AccountModel } : AccountRepositoryProps) {
        this.AccountModel = AccountModel;
    }

    async createAccount(accountProps: IAccount): Promise<IAccountDocument> {
        const [err, account] = await to<IAccountDocument>(new this.AccountModel({
            email: accountProps.email,
            password: accountProps.password,
            userID: accountProps.userID,
            role: accountProps.role,
        }).save());

        if (err) throw new Error(err.message);

        return account;
    }

    async deleteAccount(accountID: string): Promise<IAccountDocument> {
        return this.AccountModel.findByIdAndRemove(accountID);
    }

    async getAccountById(accountID: string): Promise<IAccountDocument> {
        return this.AccountModel.findById(accountID);

    }

    async getAccounts(filter?: any): Promise<IAccountDocument[]> {
        return this.AccountModel.find(filter);
    }

    async updateAccount(accountID: string, updateProps: any): Promise<IAccountDocument> {
        return this.AccountModel.findByIdAndUpdate(accountID, updateProps);
    }

}