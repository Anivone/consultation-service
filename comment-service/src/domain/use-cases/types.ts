import { ICommentRepository } from "../gateway/ICommentRepository";

export interface IUseCase<T> {

    execute(props: any): Promise<T> | Promise<T[]>;

}

export interface UseCaseProps {

    commentRepository: ICommentRepository;

}