import { Schema, Model, Document } from 'mongoose';
import { IComment } from "../../domain/entities/types";

export interface ICommentDocument extends Omit<IComment, '_id'>, Document {}

export interface ICommentModel extends IComment, Model<ICommentDocument> {}

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
})

export default CommentSchema;