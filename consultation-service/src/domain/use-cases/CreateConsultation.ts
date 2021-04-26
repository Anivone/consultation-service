import { IConsultationRepository } from "../gateway/IConsultationRepository";
import { Consultation } from "../entities/Consultation";
import { IUseCase, UseCaseProps } from "./types";
import { IConsultation } from "../entities/types";

export class CreateConsultation implements IUseCase<Consultation> {

    consultationRepository: IConsultationRepository;

    constructor({ consultationRepository }: UseCaseProps) {
        this.consultationRepository = consultationRepository;
    }

    execute(props: IConsultation): Promise<Consultation> {
        const consultation = new Consultation(props);

        return this.consultationRepository.createConsultation(consultation);
    }

}