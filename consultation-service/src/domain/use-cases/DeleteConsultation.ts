import { IUseCase, UseCaseProps } from "./types";
import { Consultation } from "../entities/Consultation";
import { IConsultationRepository } from "../gateway/IConsultationRepository";

export class DeleteConsultation implements IUseCase<Consultation> {

    consultationRepository: IConsultationRepository;

    constructor({ consultationRepository }: UseCaseProps) {
        this.consultationRepository = consultationRepository;
    }

    execute(props: string): Promise<Consultation> {
        return this.consultationRepository.deleteConsultation(props);
    }

}