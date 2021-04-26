import * as mongoose from "mongoose";
import PostSchema, { IPostDocument, IPostModel } from "../data/schemas/PostSchema";

export default function mongoModelsConfig(connection: mongoose.Connection) {
   const postModel: IPostModel = connection.model<IPostDocument, IPostModel>('Post', PostSchema);

   return {
      postModel: postModel
   }
}