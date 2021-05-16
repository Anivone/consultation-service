import { IUseCase, ConsultationUseCaseProps } from "../types";
import { IConsultationRepository } from "../../gateway/IConsultationRepository";
import { IConsultation } from "../../entities/types";

export class GetConsultationById implements IUseCase<IConsultation> {

    consultationRepository: IConsultationRepository;

    constructor({ consultationRepository }: ConsultationUseCaseProps) {
        this.consultationRepository = consultationRepository;
    }

    execute(props: string): Promise<IConsultation> {
        return this.consultationRepository.getConsultationById(props);
    }

}