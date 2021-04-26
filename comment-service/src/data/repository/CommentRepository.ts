import { ICommentRepository } from "../../domain/gateway/ICommentRepository";
import { IComment } from "../../domain/entities/types";
import { ICommentDocument, ICommentModel } from "../schemas/CommentSchema";
import to from "await-to-js";

interface CommentRepositoryProps {
    CommentModel: ICommentModel;
}

export class CommentRepository implements ICommentRepository {

    CommentModel: ICommentModel;

    constructor({CommentModel}: CommentRepositoryProps) {
        this.CommentModel = CommentModel;
    }

    async createComment(commentProps: IComment): Promise<ICommentDocument> {
        const [err, comment] = await to<ICommentDocument>(new this.CommentModel({
            text: commentProps.text,
            userID: commentProps.userID,
            postID: commentProps.postID,
            points: commentProps.points,
            date: commentProps.date,
            status: commentProps.status,
        }).save());

        if (err) throw new Error(err.message);

        return comment;
    }

    async getCommentById(postID: string): Promise<ICommentDocument> {
        return this.CommentModel.findById(postID);

    }

    async getComments(filter?: any): Promise<ICommentDocument[]> {
        return this.CommentModel.find(filter);
    }

    async deleteComment(commentID: string): Promise<ICommentDocument> {
        return this.CommentModel.findByIdAndRemove(commentID);
    }

    async updateComment(commentID: string, updateProps: any): Promise<ICommentDocument> {
        return this.CommentModel.findByIdAndUpdate(commentID, updateProps);
    }

}