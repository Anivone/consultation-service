import { IAccountRepository } from "../../domain/gateway/IAccountRepository";
import { IAccount } from "../../domain/entities/types";
import { IAccountDocument, IAccountModel } from "../schemas/AccountSchema";
import to from "await-to-js";
import { Account } from "../../domain/entities/Account";

interface AccountRepositoryProps {
    AccountModel: IAccountModel;
}

export class AccountRepository implements IAccountRepository {

    AccountModel: IAccountModel;

    constructor({ AccountModel }: AccountRepositoryProps) {
        this.AccountModel = AccountModel;
    }

    async createAccount(accountProps: IAccount): Promise<Account> {
        const [err, account] = await to<IAccount>(new this.AccountModel({
            email: accountProps.email,
            password: accountProps.password,
            userID: accountProps.userID,
            role: accountProps.role,
        }).save());

        if (err) throw new Error(err.message);

        return this.AccountModel.toAccount(account);
    }

    async deleteAccount(accountID: string): Promise<Account> {
        return this.AccountModel.toAccount(await this.AccountModel.findByIdAndRemove(accountID));
    }

    async getAccountById(accountID: string): Promise<Account> {
        return this.AccountModel.toAccount(await this.AccountModel.findById(accountID));
    }

    async getAccounts(filter?: any): Promise<Account[]> {
        const accounts = await this.AccountModel.find(filter);
        return accounts.map(account => this.AccountModel.toAccount(account));
    }

    async updateAccount(accountID: string, updateProps: any): Promise<Account> {
        return this.AccountModel.toAccount(await this.AccountModel.findByIdAndUpdate(accountID, updateProps));
    }

}