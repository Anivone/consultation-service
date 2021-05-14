import { IUseCase, UserUseCaseProps } from "../types";
import { IUserRepository } from "../../gateway/IUserRepository";
import { IUser } from "../../entities/types";

interface UpdateUseCase {
    id: string,
    updateProps: {
        specialtyID: string;
    },
}

export class PromoteUser implements IUseCase<IUser> {

    userRepository: IUserRepository;

    constructor({userRepository}: UserUseCaseProps) {
        this.userRepository = userRepository;
    }

    execute({id, updateProps}: UpdateUseCase): Promise<IUser> {
        return this.userRepository.updateUser(id, {isConsultant: true, ...updateProps});
    }

}