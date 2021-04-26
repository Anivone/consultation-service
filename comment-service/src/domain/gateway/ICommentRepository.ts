import { IComment } from "../entities/types";
import { Comment } from "../entities/Comment";

export interface ICommentRepository {

    getComments(filter?: any): Promise<Comment[]>;

    getCommentById(commentID: string): Promise<Comment>;

    createComment(commentProps: IComment): Promise<Comment>;

    updateComment(commentID: string, updateProps: any): Promise<Comment>;

    deleteComment(commentID: string): Promise<Comment>;

}