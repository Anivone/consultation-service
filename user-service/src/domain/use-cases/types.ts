import { IAccountRepository } from "../gateway/IAccountRepository";
import { IUserRepository } from "../gateway/IUserRepository";
import { IRatingRepository } from "../gateway/IRatingRepository";

export interface IUseCase<T> {
    execute(props: any): Promise<T> | Promise<T[]>;
}

export interface AccountUseCaseProps {
    accountRepository: IAccountRepository;
}

export interface UserUseCaseProps {
    userRepository: IUserRepository;
}

export interface RatingUseCaseProps {
    ratingRepository: IRatingRepository;
}