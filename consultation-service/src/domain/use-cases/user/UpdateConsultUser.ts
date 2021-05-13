import { IUseCase, ConsultUserUseCaseProps } from "../types";
import { IConsultUserRepository } from "../../gateway/IConsultUserRepository";
import { IConsultUser } from "../../entities/types";

interface UpdateUseCase {
    id: string,
    updateProps: any,
}

export class UpdateConsultUser implements IUseCase<IConsultUser> {

    consultUserRepository: IConsultUserRepository;

    constructor({ consultUserRepository }: ConsultUserUseCaseProps) {
        this.consultUserRepository = consultUserRepository;
    }

    execute({ id, updateProps }: UpdateUseCase): Promise<IConsultUser> {
        return this.consultUserRepository.updateConsultUser(id, updateProps);
    }

}