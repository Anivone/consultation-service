import * as mongoose from "mongoose";
import ConsultationSchema, { IConsultationDocument, IConsultationModel } from "../data/schemas/ConsultationSchema";

export default function mongoModelsConfig(connection: mongoose.Connection) {
   const consultationModel: IConsultationModel = connection.model<IConsultationDocument, IConsultationModel>('Consultation', ConsultationSchema);

   return {
      consultationModel: consultationModel
   }
}