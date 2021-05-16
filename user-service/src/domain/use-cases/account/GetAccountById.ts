import { IUseCase, AccountUseCaseProps } from "../types";
import { IAccountRepository } from "../../gateway/IAccountRepository";
import { IAccount } from "../../entities/types";

export class GetAccountById implements IUseCase<IAccount> {

    accountRepository: IAccountRepository;

    constructor({ accountRepository }: AccountUseCaseProps) {
        this.accountRepository = accountRepository;
    }

    execute(props: string): Promise<IAccount> {
        return this.accountRepository.getAccountById(props);
    }

}