import { IConsultation } from "../entities/types";
import { Consultation } from "../entities/Consultation";

export interface IConsultationRepository {

    getConsultations(filter?: any): Promise<Consultation[]>;

    getConsultationById(consultationID: string): Promise<Consultation>;

    createConsultation(consultationProps: IConsultation): Promise<Consultation>;

    updateConsultation(consultationID: string, updateProps: any): Promise<Consultation>;

    deleteConsultation(consultationID: string): Promise<Consultation>;

}