import { IUseCase, UseCaseProps } from "./types";
import { Consultation } from "../entities/Consultation";
import { IConsultationRepository } from "../gateway/IConsultationRepository";

export class GetConsultations implements IUseCase<Consultation> {

    consultationRepository: IConsultationRepository;

    constructor({ consultationRepository }: UseCaseProps) {
        this.consultationRepository = consultationRepository;
    }

    execute(props: any): Promise<Consultation[]> {
        return this.consultationRepository.getConsultations(props);
    }

}