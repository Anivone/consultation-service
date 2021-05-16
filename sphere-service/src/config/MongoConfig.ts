import * as mongoose from "mongoose";
import SphereSchema, { ISphereDocument, ISphereModel } from "../data/schemas/SphereSchema";

export default function mongoModelsConfig(connection: mongoose.Connection) {
   const sphereModel: ISphereModel = connection.model<ISphereDocument, ISphereModel>('Sphere', SphereSchema);

   return {
      sphereModel,
   }
}