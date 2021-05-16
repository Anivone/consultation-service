import { IUseCase, AccountUseCaseProps } from "../types";
import { IAccountRepository } from "../../gateway/IAccountRepository";
import { IAccount } from "../../entities/types";

export class GetAccounts implements IUseCase<IAccount> {

    accountRepository: IAccountRepository;

    constructor({ accountRepository }: AccountUseCaseProps) {
        this.accountRepository = accountRepository;
    }

    execute(props: any): Promise<IAccount[]> {
        return this.accountRepository.getAccounts(props);
    }

}