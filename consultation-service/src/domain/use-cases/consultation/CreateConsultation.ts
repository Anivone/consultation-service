import { IConsultationRepository } from "../../gateway/IConsultationRepository";
import { IUseCase, ConsultationUseCaseProps } from "../types";
import { IConsultation } from "../../entities/types";

export class CreateConsultation implements IUseCase<IConsultation> {

    consultationRepository: IConsultationRepository;

    constructor({ consultationRepository }: ConsultationUseCaseProps) {
        this.consultationRepository = consultationRepository;
    }

    execute(props: IConsultation): Promise<IConsultation> {
        return this.consultationRepository.createConsultation(props);
    }

}