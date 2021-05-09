import * as mongoose from "mongoose";
import PostSchema, { IPostDocument, IPostModel } from "../data/schemas/PostSchema";
import CommentSchema, { ICommentDocument, ICommentModel } from "../../src/data/schemas/CommentSchema";

export default function mongoModelsConfig(connection: mongoose.Connection) {
    const postModel = connection.model<IPostDocument, IPostModel>('Post', PostSchema);
    const commentModel = connection.model<ICommentDocument, ICommentModel>('Comment', CommentSchema);

    return {
        postModel: postModel,
        commentModel: commentModel
    }
}