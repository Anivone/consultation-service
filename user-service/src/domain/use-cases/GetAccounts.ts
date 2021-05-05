import { IUseCase, AccountUseCaseProps } from "./types";
import { Account } from "../entities/Account";
import { IAccountRepository } from "../gateway/IAccountRepository";

export class GetAccounts implements IUseCase<Account> {

    accountRepository: IAccountRepository;

    constructor({ accountRepository }: AccountUseCaseProps) {
        this.accountRepository = accountRepository;
    }

    execute(props: any): Promise<Account[]> {
        return this.accountRepository.getAccounts(props);
    }

}