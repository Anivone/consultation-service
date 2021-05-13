import { model, Schema, Model, Document } from 'mongoose';
import { IConsultation } from "../../domain/entities/types";
import { Consultation } from "../../domain/entities/Consultation";

export interface IConsultationDocument extends IConsultation, Document {}

export interface IConsultationModel extends IConsultation, Model<IConsultationDocument> {
    toConsultation(consultation: IConsultation): Consultation;
}


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
    specialtyID: {
        type: Schema.Types.String,
        required: true,
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
});

ConsultationSchema.statics.toConsultation = (consultation: IConsultation) => {
    return new Consultation({
        title: consultation.title,
        userID: consultation.userID,
        consultantID: consultation.consultantID,
        specialtyID: consultation.specialtyID,
        companyName: consultation.companyName,
        description: consultation.description,
        price: consultation.price,
    })
}

export default ConsultationSchema;