import * as mongoose from "mongoose";
import SphereSchema, { ISphereDocument, ISphereModel } from "../data/schemas/SphereSchema";
import SpecialtySchema, { ISpecialtyDocument, ISpecialtyModel } from "../data/schemas/SpecialtySchema";

export default function mongoModelsConfig(connection: mongoose.Connection) {
   const sphereModel: ISphereModel = connection.model<ISphereDocument, ISphereModel>('Sphere', SphereSchema);
   const specialtyModel: ISpecialtyModel = connection.model<ISpecialtyDocument, ISpecialtyModel>('Specialty', SpecialtySchema);

   return {
      sphereModel,
      specialtyModel
   }
}