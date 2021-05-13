import to from "await-to-js";
import { IConsultationRepository } from "../../domain/gateway/IConsultationRepository";
import { IConsultation } from "../../domain/entities/types";
import { IConsultationModel } from "../schemas/ConsultationSchema";

interface ConsultationRepositoryProps {
    ConsultationModel: IConsultationModel;
}

export class ConsultationRepository implements IConsultationRepository {

    ConsultationModel: IConsultationModel;

    constructor({ConsultationModel}: ConsultationRepositoryProps) {
        this.ConsultationModel = ConsultationModel;
    }

    async createConsultation(consultationProps: IConsultation): Promise<IConsultation> {
        const [err, comment] = await to<IConsultation>(new this.ConsultationModel({
            title: consultationProps.title,
            userID: consultationProps.userID,
            consultantID: consultationProps.consultantID,
            specialtyID: consultationProps.specialtyID,
            companyName: consultationProps.companyName,
            description: consultationProps.description,
            price: consultationProps.price
        }).save());

        if (err) throw err;

        return this.ConsultationModel.toConsultation(comment);
    }

    async getConsultationById(postID: string): Promise<IConsultation> {
        return this.ConsultationModel.toConsultation(await this.ConsultationModel.findById(postID));
    }

    async getConsultations(filter?: any): Promise<IConsultation[]> {
        const consultations = await this.ConsultationModel.find(filter);
        return consultations.map(consultation => this.ConsultationModel.toConsultation(consultation));
    }

    async deleteConsultation(commentID: string): Promise<IConsultation> {
        return this.ConsultationModel.toConsultation(await this.ConsultationModel.findByIdAndRemove(commentID));
    }

    async updateConsultation(commentID: string, updateProps: any): Promise<IConsultation> {
        return this.ConsultationModel.toConsultation(await this.ConsultationModel.findByIdAndUpdate(commentID, updateProps));
    }

}