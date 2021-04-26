import { IUseCase, UseCaseProps } from "./types";
import { Comment } from "../entities/Comment";
import { ICommentRepository } from "../gateway/ICommentRepository";

export class DeleteComment implements IUseCase<Comment> {

    commentRepository: ICommentRepository;

    constructor({ commentRepository }: UseCaseProps) {
        this.commentRepository = commentRepository;
    }

    execute(props: string): Promise<Comment> {
        return this.commentRepository.deleteComment(props);
    }

}