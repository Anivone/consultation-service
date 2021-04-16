import { IPostRepository } from "../gateway/IPostRepository";

export interface IUseCase<T> {

    execute(props: any): Promise<T> | Promise<T[]>;

}

export interface UseCaseProps {

    postRepository: IPostRepository;

}