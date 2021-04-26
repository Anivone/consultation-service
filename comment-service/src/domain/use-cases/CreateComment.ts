import { ICommentRepository } from "../gateway/ICommentRepository";
import { Comment } from "../entities/Comment";
import { IUseCase, UseCaseProps } from "./types";
import { IComment } from "../entities/types";

export class CreateComment implements IUseCase<Comment> {

    commentRepository: ICommentRepository;

    constructor({ commentRepository }: UseCaseProps) {
        this.commentRepository = commentRepository;
    }

    execute(props: IComment): Promise<Comment> {
        const comment = new Comment(props);

        return this.commentRepository.createComment(comment);
    }

}