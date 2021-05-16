import * as mongoose from "mongoose";
import AccountSchema, { IAccountDocument, IAccountModel } from "../data/schemas/AccountSchema";
import UserSchema, { IUserDocument, IUserModel } from "../data/schemas/UserSchema";
import RatingSchema, { IRatingDocument, IRatingModel } from "../data/schemas/RatingSchema";

export default function mongoModelsConfig(connection: mongoose.Connection) {
   const accountModel: IAccountModel = connection.model<IAccountDocument, IAccountModel>('Account', AccountSchema);
   const userModel: IUserModel = connection.model<IUserDocument, IUserModel>('User', UserSchema);
   const ratingModel: IRatingModel = connection.model<IRatingDocument, IRatingModel>('Rating', RatingSchema);

   return {
      accountModel: accountModel,
      userModel: userModel,
      ratingModel: ratingModel
   }
}