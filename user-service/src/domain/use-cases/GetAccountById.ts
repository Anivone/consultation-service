import { IUseCase, AccountUseCaseProps } from "./types";
import { Account } from "../entities/Account";
import { IAccountRepository } from "../gateway/IAccountRepository";

export class GetAccountById implements IUseCase<Account> {

    accountRepository: IAccountRepository;

    constructor({ accountRepository }: AccountUseCaseProps) {
        this.accountRepository = accountRepository;
    }

    execute(props: string): Promise<Account> {
        return this.accountRepository.getAccountById(props);
    }

}