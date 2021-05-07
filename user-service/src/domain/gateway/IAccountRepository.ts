import { IAccount } from "../entities/types";

export interface IAccountRepository {

    getAccounts(filter?: any): Promise<IAccount[]>;

    getAccountById(postID: string): Promise<IAccount>;

    createAccount(postProps: IAccount): Promise<IAccount>;

    updateAccount(postID: string, updateProps: any): Promise<IAccount>;

    deleteAccount(postID: string): Promise<IAccount>;

}