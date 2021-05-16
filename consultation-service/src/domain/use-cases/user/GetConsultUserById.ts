import { IUseCase, ConsultUserUseCaseProps } from "../types";
import { IConsultUserRepository } from "../../gateway/IConsultUserRepository";
import { IConsultUser } from "../../entities/types";

export class GetConsultUserById implements IUseCase<IConsultUser> {

    consultUserRepository: IConsultUserRepository;

    constructor({ consultUserRepository }: ConsultUserUseCaseProps) {
        this.consultUserRepository = consultUserRepository;
    }

    execute(props: string): Promise<IConsultUser> {
        return this.consultUserRepository.getConsultUserById(props);
    }

}