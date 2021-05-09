import { CommentUseCaseProps, IUseCase } from "../types";
import { ICommentRepository } from "../../gateway/ICommentRepository";
import { IComment } from "../../entities/types";


export class DeleteComment implements IUseCase<IComment> {

    commentRepository: ICommentRepository;

    constructor({ commentRepository }: CommentUseCaseProps) {
        this.commentRepository = commentRepository;
    }

    execute(props: string): Promise<IComment> {
        return this.commentRepository.deleteComment(props);
    }

}