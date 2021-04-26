import * as mongoose from "mongoose";
import SphereModel, { ISphereDocument, ISphereModel } from "../data/schemas/SphereModel";

export default function mongoModelsConfig(connection: mongoose.Connection) {
   const sphereModel: ISphereModel = connection.model<ISphereDocument, ISphereModel>('Sphere', SphereModel);

   return {
      sphereModel: sphereModel
   }
}