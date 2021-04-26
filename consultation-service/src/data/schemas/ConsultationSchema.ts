import { model, Schema, Model, Document } from 'mongoose';
import { IConsultation } from "../../domain/entities/types";

export interface IConsultationDocument extends IConsultation, Document {}

export interface IConsultationModel extends IConsultation, Model<IConsultationDocument> {}


const ConsultationSchema: Schema<IConsultationDocument> = new Schema<IConsultationDocument>({
    title: {
        type: Schema.Types.String,
        required: true,
    },
    userID: {
        type: Schema.Types.String,
        required: true
    },
    consultantID: {
        type: Schema.Types.String,
        required: true
    },
    sphereID: {
        type: Schema.Types.String,
        required: true
    },
    companyName: {
        type: Schema.Types.String,
        required: false
    },
    description: {
        type: Schema.Types.String,
        required: true
    },
    price: {
        type: Schema.Types.Number,
        required: true
    }
})

export default ConsultationSchema;