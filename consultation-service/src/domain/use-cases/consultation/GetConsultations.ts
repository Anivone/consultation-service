import { IUseCase, ConsultationUseCaseProps } from "../types";
import { IConsultationRepository } from "../../gateway/IConsultationRepository";
import { IConsultation } from "../../entities/types";

export class GetConsultations implements IUseCase<IConsultation> {

    consultationRepository: IConsultationRepository;

    constructor({ consultationRepository }: ConsultationUseCaseProps) {
        this.consultationRepository = consultationRepository;
    }

    execute(props: any): Promise<IConsultation[]> {
        return this.consultationRepository.getConsultations(props);
    }

}