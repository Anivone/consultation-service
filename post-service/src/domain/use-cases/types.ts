import { IPostRepository } from "../gateway/IPostRepository";

export interface IUseCase<T> {

    execute(props: any): Promise<T> | Promise<T[]> | Promise<void>;

}

export interface UseCaseProps {

    postRepository: IPostRepository;

}