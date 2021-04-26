import { IConsultationRepository } from "../../domain/gateway/IConsultationRepository";
import { IConsultation } from "../../domain/entities/types";
import { Consultation } from "../../domain/entities/Consultation";
import { IConsultationDocument, IConsultationModel } from "../schemas/ConsultationSchema";
import to from "await-to-js";

interface ConsultationRepositoryProps {
    ConsultationModel: IConsultationModel;
}

export class ConsultationRepository implements IConsultationRepository {

    ConsultationModel: IConsultationModel;

    constructor({ConsultationModel}: ConsultationRepositoryProps) {
        this.ConsultationModel = ConsultationModel;
    }

    async createConsultation(consultationProps: IConsultation): Promise<IConsultationDocument> {
        const [err, comment] = await to<IConsultationDocument>(new this.ConsultationModel({
            title: consultationProps.title,
            userID: consultationProps.userID,
            consultantID: consultationProps.consultantID,
            sphereID: consultationProps.sphereID,
            specialty: consultationProps.specialty,
            companyName: consultationProps.companyName,
            description: consultationProps.description,
            price: consultationProps.price
        }).save());

        if (err) throw new Error(err.message);

        return comment;
    }

    async getConsultationById(postID: string): Promise<IConsultationDocument> {
        return this.ConsultationModel.findById(postID);

    }

    async getConsultations(filter?: any): Promise<IConsultationDocument[]> {
        return this.ConsultationModel.find(filter);
    }

    async deleteConsultation(commentID: string): Promise<IConsultationDocument> {
        return this.ConsultationModel.findByIdAndRemove(commentID);
    }

    async updateConsultation(commentID: string, updateProps: any): Promise<IConsultationDocument> {
        return this.ConsultationModel.findByIdAndUpdate(commentID, updateProps);
    }

}