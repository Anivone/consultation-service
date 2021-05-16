import { IComment } from "../entities/types";

export interface ICommentRepository {

    getComments(filter?: any): Promise<IComment[]>;

    getCommentById(commentID: string): Promise<IComment>;

    createComment(commentProps: IComment): Promise<IComment>;

    updateComment(commentID: string, updateProps: any): Promise<IComment>;

    deleteComment(commentID: string): Promise<IComment>;

    deletePostComments(postID: string): Promise<any>;

}