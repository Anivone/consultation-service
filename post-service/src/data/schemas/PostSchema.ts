import { model, Schema, Model, Document } from 'mongoose';
import { IPost, Status } from "../../domain/entities/types";
import { Post } from "../../domain/entities/Post";

export interface IPostDocument extends IPost, Document {}

export interface IPostModel extends IPost, Model<IPostDocument> {
    toPost(postDocument: IPostDocument): IPost;
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

PostSchema.statics.toPost = (post: IPostDocument): IPost => {
    return new Post({
        title: post.title,
        description: post.description,
        userID: post.userID,
        relevance: post.relevance,
        date: post.date,
        views: post.views,
        sphereID: post.sphereID,
        status: post.status,
        edited: post.edited
    });
}

export default PostSchema;