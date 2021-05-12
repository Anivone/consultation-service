import * as mongoose from "mongoose";
import UserTagsSchema, { IUserTagsDocument, IUserTagsModel } from "../data/schemas/UserTagsSchema";
import PostViewersSchema, { IPostViewersDocument, IPostViewersModel } from "../data/schemas/PostViewersSchema";

export default function mongoModelsConfig(connection: mongoose.Connection) {
   const userTagsModel: IUserTagsModel = connection.model<IUserTagsDocument, IUserTagsModel>('UserTags', UserTagsSchema);
   const postViewersModel: IPostViewersModel = connection.model<IPostViewersDocument, IPostViewersModel>('PostViewers', PostViewersSchema);

   return {
      userTagsModel: userTagsModel,
      postViewersModel: postViewersModel,
   }
}