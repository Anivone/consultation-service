import { IAccountRepository } from "../gateway/IAccountRepository";
import { IUserRepository } from "../gateway/IUserRepository";

export interface IUseCase<T> {
    execute(props: any): Promise<T> | Promise<T[]>;
}

export interface AccountUseCaseProps {
    accountRepository: IAccountRepository;
}

export interface UserUseCaseProps {
    userRepository: IUserRepository;
}