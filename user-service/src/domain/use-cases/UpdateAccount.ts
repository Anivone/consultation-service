import { IUseCase, AccountUseCaseProps } from "./types";
import { Account } from "../entities/Account";
import { IAccountRepository } from "../gateway/IAccountRepository";

interface UpdateUseCase {
    id: string,
    updateProps: any,
}

export class UpdateAccount implements IUseCase<Account> {

    accountRepository: IAccountRepository;

    constructor({ accountRepository }: AccountUseCaseProps) {
        this.accountRepository = accountRepository;
    }

    execute({ id, updateProps }: UpdateUseCase): Promise<Account> {
        return this.accountRepository.updateAccount(id, updateProps);
    }

}