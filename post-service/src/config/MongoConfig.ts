import * as mongoose from "mongoose";
import PostSchema, { IPostDocument, IPostModel } from "../data/schemas/PostSchema";
import CommentSchema, { ICommentDocument, ICommentModel } from "../../src/data/schemas/CommentSchema";
import PostUserSchema, { IPostUserDocument, IPostUserModel } from "../data/schemas/PostUserSchema";
import RatingSchema, { IRatingDocument, IRatingModel } from "../data/schemas/RatingSchema";

export default function mongoModelsConfig(connection: mongoose.Connection) {
    const postModel = connection.model<IPostDocument, IPostModel>('Post', PostSchema);
    const commentModel = connection.model<ICommentDocument, ICommentModel>('Comment', CommentSchema);
    const postUserModel = connection.model<IPostUserDocument, IPostUserModel>('PostUser', PostUserSchema);
    const ratingModel = connection.model<IRatingDocument, IRatingModel>('Rating', RatingSchema);

    return {
        postModel: postModel,
        commentModel: commentModel,
        postUserModel: postUserModel,
        ratingModel: ratingModel,
    }
}