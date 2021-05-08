import { IUseCase, AccountUseCaseProps } from "../types";
import { IAccountRepository } from "../../gateway/IAccountRepository";
import { IAccount } from "../../entities/types";
import { GetAccounts } from "./GetAccounts";
import to from "await-to-js";

interface DeleteAccountByUserIdProps {
    getAccounts: GetAccounts;
}

export class DeleteAccountByUserId implements IUseCase<IAccount> {

    accountRepository: IAccountRepository;
    getAccounts: GetAccounts;

    constructor({ accountRepository, getAccounts }: AccountUseCaseProps & DeleteAccountByUserIdProps) {
        this.accountRepository = accountRepository;
        this.getAccounts = getAccounts;
    }

    async execute(userID: string): Promise<IAccount> {
        const [err, accounts] = await to<IAccount[]>(this.getAccounts.execute({userID}));
        if (err) throw err;
        if (!accounts[0]) throw new Error('No accounts with such userID have been found');

        console.log('  [X] DeleteAccountByUserId account: ', accounts[0]);

        return this.accountRepository.deleteAccount(accounts[0]._id);
    }

}