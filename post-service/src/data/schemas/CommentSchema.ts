import { Schema, Model, Document } from 'mongoose';
import { IComment } from "../../domain/entities/types";
import { Comment } from "../../domain/entities/Comment";

export interface ICommentDocument extends Omit<IComment, '_id'>, Document {}

export interface ICommentModel extends IComment, Model<ICommentDocument> {
    toComment(comment: IComment): Comment;
}

const CommentSchema: Schema<ICommentDocument> = new Schema<ICommentDocument>({
    text: {
        type: Schema.Types.String,
        required: true,
    },
    userID: {
        type: Schema.Types.String,
        required: true
    },
    postID: {
        type: Schema.Types.String,
        required: true
    },
    points: {
        type: Schema.Types.Number,
        required: true,
        default: 0,
    },
    date: {
        day: {
            type: Schema.Types.Number,
            required: true
        },
        month: {
            type: Schema.Types.Number,
            required: true
        },
        year: {
            type: Schema.Types.Number,
            required: true
        }
    }
});

CommentSchema.statics.toComment = (comment: IComment) => {
    return new Comment({
        _id: comment._id.toString(),
        text: comment.text,
        userID: comment.userID,
        postID: comment.postID,
        points: comment.points,
        date: {
            day: comment.date.day,
            month: comment.date.month,
            year: comment.date.year,
        },
    })
}

export default CommentSchema;