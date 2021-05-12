import { IUseCase, UserUseCaseProps } from "../types";
import { IPostUserRepository } from "../../gateway/IUserRepository";
import { IUser } from "../../entities/types";

interface UpdateUseCase {
    id: string,
    updateProps: {
        position: string;
        consultationsNumber: number;
        reviewsNumber: number;
        ratingID: string;
    },
}

export class PromoteUser implements IUseCase<IUser> {

    userRepository: IPostUserRepository;

    constructor({userRepository}: UserUseCaseProps) {
        this.userRepository = userRepository;
    }

    execute({id, updateProps}: UpdateUseCase): Promise<IUser> {
        return this.userRepository.updateUser(id, {isConsultant: true, ...updateProps});
    }

}