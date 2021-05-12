import { Schema, Model, Document } from 'mongoose';
import { IPost, Status } from "../../domain/entities/types";
import { Post } from "../../domain/entities/Post";

export interface IPostDocument extends Omit<IPost, '_id'>, Document {}

export interface IPostModel extends IPost, Model<IPostDocument> {
    toPost(post: IPost): Post;
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
        required: true,
        default: 0,
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
        required: true,
        default: 0
    },
    sphereID: {
        type: Schema.Types.String,
        required: true,
    },
    specialty: {
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
        default: false
    }
});

PostSchema.statics.toPost = (post: IPost) => {
    return new Post({
        _id: post._id.toString(),
        title: post.title,
        description: post.description,
        userID: post.userID,
        relevance: post.relevance,
        tags: post.tags,
        date: {
            day: post.date.day,
            month: post.date.month,
            year: post.date.year,
        },
        views: post.views,
        sphereID: post.sphereID,
        specialty: post.specialty,
        status: post.status,
        edited: post.edited,
    })
}

export default PostSchema;