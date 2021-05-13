import { IUseCase, ConsultationUseCaseProps } from "../types";
import { IConsultationRepository } from "../../gateway/IConsultationRepository";
import { IConsultation } from "../../entities/types";

interface UpdateUseCase {
    id: string,
    updateProps: any,
}

export class UpdateConsultation implements IUseCase<IConsultation> {

    consultationRepository: IConsultationRepository;

    constructor({ consultationRepository }: ConsultationUseCaseProps) {
        this.consultationRepository = consultationRepository;
    }

    execute({ id, updateProps }: UpdateUseCase): Promise<IConsultation> {
        return this.consultationRepository.updateConsultation(id, updateProps);
    }

}