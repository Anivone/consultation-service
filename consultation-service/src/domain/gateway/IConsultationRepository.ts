import { IConsultation } from "../entities/types";

export interface IConsultationRepository {

    getConsultations(filter?: any): Promise<IConsultation[]>;

    getConsultationById(consultationID: string): Promise<IConsultation>;

    createConsultation(consultationProps: IConsultation): Promise<IConsultation>;

    updateConsultation(consultationID: string, updateProps: any): Promise<IConsultation>;

    deleteConsultation(consultationID: string): Promise<IConsultation>;

}