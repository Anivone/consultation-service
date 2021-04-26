import { Schema, Model, Document } from 'mongoose';
import { IPost, Status } from "../../domain/entities/types";

export interface IPostDocument extends IPost, Document {}

export interface IPostModel extends IPost, Model<IPostDocument> {
}

const PostSchema: Schema<IPostDocument> = new Schema<IPostDocument>({
    title: {
        type: Schema.Types.String,
        required: true,
    },
    description: {
        type: Schema.Types.String,
        required: true,
    },
    userID: {
        type: Schema.Types.String,
        required: true
    },
    relevance: {
        type: Schema.Types.Number,
        required: true
    },
    tags: [{
       type: Schema.Types.String,
       required: true,
       default: []
    }],
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
    views: {
        type: Schema.Types.Number,
        required: true
    },
    sphereID: {
        type: Schema.Types.String,
        required: true,
    },
    status: {
        type: Schema.Types.String,
        enum: Status,
        default: Status.ACTIVE,
        required: true
    },
    edited: {
        type: Schema.Types.Boolean,
        required: true,
    }
})

export default PostSchema;