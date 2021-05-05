import * as mongoose from "mongoose";
import AccountSchema, { IAccountDocument, IAccountModel } from "../data/schemas/AccountSchema";
import UserSchema, { IUserDocument, IUserModel } from "../data/schemas/UserSchema";

export default function mongoModelsConfig(connection: mongoose.Connection) {
   const accountModel: IAccountModel = connection.model<IAccountDocument, IAccountModel>('Account', AccountSchema);
   const userModel: IUserModel = connection.model<IUserDocument, IUserModel>('User', UserSchema);

   return {
      accountModel: accountModel,
      userModel: userModel
   }
}