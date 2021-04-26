import { IUseCase, UseCaseProps } from "./types";
import { Comment } from "../entities/Comment";
import { ICommentRepository } from "../gateway/ICommentRepository";

export class GetComments implements IUseCase<Comment> {

    commentRepository: ICommentRepository;

    constructor({ commentRepository }: UseCaseProps) {
        this.commentRepository = commentRepository;
    }

    execute(props: any): Promise<Comment[]> {
        return this.commentRepository.getComments(props);
    }

}