import { IPostRepository } from "../gateway/IPostRepository";
import { ICommentRepository } from "../gateway/ICommentRepository";

export interface IUseCase<T> {

    execute(props: any): Promise<T> | Promise<T[]>;

}

export interface PostUseCaseProps {
    postRepository: IPostRepository;
}

export interface CommentUseCaseProps {
    commentRepository: ICommentRepository;
}