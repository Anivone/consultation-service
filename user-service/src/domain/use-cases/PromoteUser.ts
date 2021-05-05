import { IUseCase, UserUseCaseProps } from "./types";
import { User } from "../entities/User";
import { IUserRepository } from "../gateway/IUserRepository";

interface UpdateUseCase {
    id: string,
    updateProps: {
        position: string;
        consultationsNumber: number;
        reviewsNumber: number;
        ratingID: string;
    },
}

export class PromoteUser implements IUseCase<User> {

    userRepository: IUserRepository;

    constructor({userRepository}: UserUseCaseProps) {
        this.userRepository = userRepository;
    }

    execute({id, updateProps}: UpdateUseCase): Promise<User> {
        return this.userRepository.updateUser(id, {isConsultant: true, ...updateProps});
    }

}