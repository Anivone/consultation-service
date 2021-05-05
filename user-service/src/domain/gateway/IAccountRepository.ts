import { Account } from "../entities/Account";
import { IAccount } from "../entities/types";

export interface IAccountRepository {

    getAccounts(filter?: any): Promise<Account[]>;

    getAccountById(postID: string): Promise<Account>;

    createAccount(postProps: IAccount): Promise<Account>;

    updateAccount(postID: string, updateProps: any): Promise<Account>;

    deleteAccount(postID: string): Promise<Account>;

}