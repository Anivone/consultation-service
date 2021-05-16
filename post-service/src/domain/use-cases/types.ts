import { IPostRepository } from "../gateway/IPostRepository";
import { ICommentRepository } from "../gateway/ICommentRepository";
import { IPostUserRepository } from "../gateway/IPostUserRepository";
import { IRatingRepository } from "../gateway/IRatingRepository";

export interface IUseCase<T> {
    execute(props: any): Promise<T> | Promise<T[]>;
}

export interface PostUseCaseProps {
    postRepository: IPostRepository;
}

export interface CommentUseCaseProps {
    commentRepository: ICommentRepository;
}

export interface PostUserUseCaseProps {
    postUserRepository: IPostUserRepository;
}

export interface RatingUseCaseProps {
    ratingRepository: IRatingRepository;
}