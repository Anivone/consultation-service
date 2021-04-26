import { IUseCase, UseCaseProps } from "./types";
import { Comment } from "../entities/Comment";
import { ICommentRepository } from "../gateway/ICommentRepository";

interface UpdateUseCase {
    id: string,
    updateProps: any,
}

export class UpdateComment implements IUseCase<Comment> {

    commentRepository: ICommentRepository;

    constructor({ commentRepository }: UseCaseProps) {
        this.commentRepository = commentRepository;
    }

    execute({ id, updateProps }: UpdateUseCase): Promise<Comment> {
        return this.commentRepository.updateComment(id, updateProps);
    }

}