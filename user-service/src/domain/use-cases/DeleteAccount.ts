import { IUseCase, AccountUseCaseProps } from "./types";
import { Account } from "../entities/Account";
import { IAccountRepository } from "../gateway/IAccountRepository";

export class DeleteAccount implements IUseCase<Account> {

    accountRepository: IAccountRepository;

    constructor({ accountRepository }: AccountUseCaseProps) {
        this.accountRepository = accountRepository;
    }

    execute(props: string): Promise<Account> {
        return this.accountRepository.deleteAccount(props);
    }

}