import { model, Schema, Model, Document } from 'mongoose';
import { IComment, Status } from "../../domain/entities/types";
import { Comment } from "../../domain/entities/Comment";

export interface ICommentDocument extends IComment, Document {}

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
        required: true
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
    },
    status: {
        type: Schema.Types.String,
        enum: Status,
        default: Status.DRAFT,
        required: true
    }
})

export default CommentSchema;