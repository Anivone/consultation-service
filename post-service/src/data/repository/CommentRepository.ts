import { ICommentRepository } from "../../domain/gateway/ICommentRepository";
import { IComment } from "../../domain/entities/types";
import { ICommentModel } from "../schemas/CommentSchema";
import to from "await-to-js";
import { Comment } from "../../domain/entities/Comment";

interface CommentRepositoryProps {
    CommentModel: ICommentModel;
}

export class CommentRepository implements ICommentRepository {

    CommentModel: ICommentModel;

    constructor({CommentModel}: CommentRepositoryProps) {
        this.CommentModel = CommentModel;
    }

    async createComment(commentProps: IComment): Promise<Comment> {
        console.log('[X] createComment accessed !');
        const [err, comment] = await to<IComment>(new this.CommentModel({
            text: commentProps.text,
            userID: commentProps.userID,
            postID: commentProps.postID,
            points: commentProps.points,
            date: commentProps.date,
        }).save());
        if (err) throw err;

        return new Comment(comment);
    }

    async getCommentById(postID: string): Promise<Comment> {
        return new Comment(await this.CommentModel.findById(postID));
    }

    async getComments(filter?: any): Promise<Comment[]> {
        const comments = await this.CommentModel.find(filter);
        return comments.map(comment => new Comment(comment));
    }

    async deleteComment(commentID: string): Promise<Comment> {
        return new Comment(await this.CommentModel.findByIdAndRemove(commentID));
    }

    async updateComment(commentID: string, updateProps: any): Promise<Comment> {
        return new Comment(await this.CommentModel.findByIdAndUpdate(commentID, updateProps));
    }

    async deletePostComments(postID: string): Promise<any> {
        return this.CommentModel.deleteMany({postID});
    }

}