import { CommentUseCaseProps, IUseCase } from "../types";
import { ICommentRepository } from "../../gateway/ICommentRepository";
import { IComment } from "../../entities/types";

export class GetComments implements IUseCase<IComment> {

    commentRepository: ICommentRepository;

    constructor({ commentRepository }: CommentUseCaseProps) {
        this.commentRepository = commentRepository;
    }

    execute(props: any): Promise<IComment[]> {
        return this.commentRepository.getComments(props);
    }

}