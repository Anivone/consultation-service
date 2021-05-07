import { IUseCase, AccountUseCaseProps } from "../types";
import { IAccountRepository } from "../../gateway/IAccountRepository";
import { IAccount } from "../../entities/types";

interface UpdateUseCase {
    id: string,
    updateProps: any,
}

export class UpdateAccount implements IUseCase<IAccount> {

    accountRepository: IAccountRepository;

    constructor({ accountRepository }: AccountUseCaseProps) {
        this.accountRepository = accountRepository;
    }

    execute({ id, updateProps }: UpdateUseCase): Promise<IAccount> {
        return this.accountRepository.updateAccount(id, updateProps);
    }

}