import { IUseCase, ConsultUserUseCaseProps } from "../types";
import { IConsultUserRepository } from "../../gateway/IConsultUserRepository";
import { IConsultUser } from "../../entities/types";

export class GetConsultUsers implements IUseCase<IConsultUser> {

    consultUserRepository: IConsultUserRepository;

    constructor({ consultUserRepository }: ConsultUserUseCaseProps) {
        this.consultUserRepository = consultUserRepository;
    }

    execute(props: any): Promise<IConsultUser[]> {
        return this.consultUserRepository.getConsultUsers(props);
    }

}