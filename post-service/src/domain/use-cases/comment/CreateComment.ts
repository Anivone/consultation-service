import { CommentUseCaseProps, IUseCase } from "../types";
import { ICommentRepository } from "../../gateway/ICommentRepository";
import { IComment } from "../../entities/types";

export class CreateComment implements IUseCase<IComment> {

    commentRepository: ICommentRepository;

    constructor({ commentRepository }: CommentUseCaseProps) {
        this.commentRepository = commentRepository;
    }

    execute(props: IComment): Promise<IComment> {
        console.log('[X] CreateComment accessed !');
        return this.commentRepository.createComment(props);
    }

}