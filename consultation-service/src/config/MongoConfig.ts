import * as mongoose from "mongoose";
import ConsultationSchema, { IConsultationDocument, IConsultationModel } from "../data/schemas/ConsultationSchema";
import SpecialtySchema, { ISpecialtyDocument, ISpecialtyModel } from "../data/schemas/SpecialtySchema";

export default function mongoModelsConfig(connection: mongoose.Connection) {
   const consultationModel: IConsultationModel = connection.model<IConsultationDocument, IConsultationModel>('Consultation', ConsultationSchema);
   const specialtyModel: ISpecialtyModel = connection.model<ISpecialtyDocument, ISpecialtyModel>('Specialty', SpecialtySchema);

   return {
      consultationModel: consultationModel,
      specialtyModel: specialtyModel,
   }
}