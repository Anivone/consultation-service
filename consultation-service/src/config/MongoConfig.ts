import * as mongoose from "mongoose";
import ConsultationSchema, { IConsultationDocument, IConsultationModel } from "../data/schemas/ConsultationSchema";
import SpecialtySchema, { ISpecialtyDocument, ISpecialtyModel } from "../data/schemas/SpecialtySchema";
import ConsultUserSchema, { IConsultUserDocument, IConsultUserModel } from "../data/schemas/ConsultUserSchema";
import RatingSchema, { IRatingDocument, IRatingModel } from "../data/schemas/RatingSchema";

export default function mongoModelsConfig(connection: mongoose.Connection) {
   const consultationModel: IConsultationModel = connection.model<IConsultationDocument, IConsultationModel>('Consultation', ConsultationSchema);
   const specialtyModel: ISpecialtyModel = connection.model<ISpecialtyDocument, ISpecialtyModel>('Specialty', SpecialtySchema);
   const consultUserModel: IConsultUserModel = connection.model<IConsultUserDocument, IConsultUserModel>('ConsultUser', ConsultUserSchema);
   const ratingModel: IRatingModel = connection.model<IRatingDocument, IRatingModel>('Rating', RatingSchema);

   return {
      consultationModel: consultationModel,
      specialtyModel: specialtyModel,
      consultUserModel: consultUserModel,
      ratingModel: ratingModel,
   }
}