import { CommentUseCaseProps, IUseCase } from "../types";
import { ICommentRepository } from "../../gateway/ICommentRepository";
import { IComment } from "../../entities/types";

interface UpdateUseCase {
    id: string,
    updateProps: any,
}

export class UpdateComment implements IUseCase<IComment> {

    commentRepository: ICommentRepository;

    constructor({ commentRepository }: CommentUseCaseProps) {
        this.commentRepository = commentRepository;
    }

    execute({ id, updateProps }: UpdateUseCase): Promise<IComment> {
        return this.commentRepository.updateComment(id, updateProps);
    }

}