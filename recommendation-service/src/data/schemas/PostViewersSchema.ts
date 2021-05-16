import { Schema, Model, Document } from 'mongoose';
import { IPostViewers } from "../../domain/entities/types";
import { PostViewers } from "../../domain/entities/PostViewers";

export interface IPostViewersDocument extends Omit<IPostViewers, '_id'>, Document {}

export interface IPostViewersModel extends IPostViewers, Model<IPostViewersDocument> {
    toPostViewers(postViewer: IPostViewers): PostViewers;
}

const PostViewersSchema: Schema<IPostViewersDocument> = new Schema<IPostViewersDocument>({
    viewersID: [{
        type: Schema.Types.String,
        required: true
    }],
    tags: [{
        type: Schema.Types.String,
        required: true
    }]
})

PostViewersSchema.statics.toPostViewers = (postViewer: IPostViewers) => {
    return new PostViewers({
        _id: postViewer._id.toString(),
        viewersID: postViewer.viewersID,
        tags: postViewer.tags
    });
}

export default PostViewersSchema;