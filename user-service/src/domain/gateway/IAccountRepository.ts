import { IAccount } from "../entities/types";

export interface IAccountRepository {

    getAccounts(filter?: any): Promise<IAccount[]>;

    getAccountById(accountID: string): Promise<IAccount>;

    createAccount(accountProps: IAccount): Promise<IAccount>;

    updateAccount(accountID: string, updateProps: any): Promise<IAccount>;

    deleteAccount(accountID: string): Promise<IAccount>;

}