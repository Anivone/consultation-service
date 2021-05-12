import { IAccountRepository } from "../gateway/IAccountRepository";
import { IPostUserRepository } from "../gateway/IUserRepository";
import { IRatingRepository } from "../gateway/IRatingRepository";

export interface IUseCase<T> {
    execute(props: any): Promise<T> | Promise<T[]>;
}

export interface AccountUseCaseProps {
    accountRepository: IAccountRepository;
}

export interface UserUseCaseProps {
    userRepository: IPostUserRepository;
}

export interface RatingUseCaseProps {
    ratingRepository: IRatingRepository;
}