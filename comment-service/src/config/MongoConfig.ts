import * as mongoose from "mongoose";
import CommentSchema, { ICommentDocument, ICommentModel } from "../data/schemas/CommentSchema";

export default function mongoModelsConfig(connection: mongoose.Connection) {
   const commentModel: ICommentModel = connection.model<ICommentDocument, ICommentModel>('Comment', CommentSchema);

   return {
      commentModel: commentModel
   }
}