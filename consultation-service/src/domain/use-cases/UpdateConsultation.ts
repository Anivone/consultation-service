import { IUseCase, UseCaseProps } from "./types";
import { Consultation } from "../entities/Consultation";
import { IConsultationRepository } from "../gateway/IConsultationRepository";

interface UpdateUseCase {
    id: string,
    updateProps: any,
}

export class UpdateConsultation implements IUseCase<Consultation> {

    consultationRepository: IConsultationRepository;

    constructor({ consultationRepository }: UseCaseProps) {
        this.consultationRepository = consultationRepository;
    }

    execute({ id, updateProps }: UpdateUseCase): Promise<Consultation> {
        return this.consultationRepository.updateConsultation(id, updateProps);
    }

}