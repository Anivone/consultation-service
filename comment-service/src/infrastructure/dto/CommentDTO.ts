import { ICommentDocument } from "../../data/schemas/CommentSchema";
import { Comment } from "../../domain/entities/Comment";

export default class CommentDTO extends Comment{

    readonly _id: string;

    constructor(commentDocument: ICommentDocument) {
        super({
            text: commentDocument.text,
            userID: commentDocument.userID,
            postID: commentDocument.postID,
            points: commentDocument.points,
            date: commentDocument.date,
            status: commentDocument.status,
        });

        this._id = commentDocument._id.toString();
    }

}