import { IAccountRepository } from "../../gateway/IAccountRepository";
import { Account } from "../../entities/Account";
import { IUseCase, AccountUseCaseProps } from "../types";
import { IAccount } from "../../entities/types";

export class CreateAccount implements IUseCase<IAccount> {

    accountRepository: IAccountRepository;

    constructor({ accountRepository }: AccountUseCaseProps) {
        this.accountRepository = accountRepository;
    }

    execute(props: IAccount): Promise<IAccount> {
        const account = new Account(props);

        return this.accountRepository.createAccount(account);
    }

}