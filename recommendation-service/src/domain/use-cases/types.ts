import { IUserTagsRepository } from "../gateway/IUserTagsRepository";
import { IPostViewersRepository } from "../gateway/IPostViewersRepository";

export interface IUseCase<T> {

    execute(props: any): Promise<T> | Promise<T[]>;

}

export interface UserTagsUseCaseProps {
    userTagsRepository: IUserTagsRepository;
}

export interface PostViewersUseCaseProps {
    postViewersRepository: IPostViewersRepository;
}