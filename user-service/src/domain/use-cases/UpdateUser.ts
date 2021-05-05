import { IUseCase, UserUseCaseProps } from "./types";
import { User } from "../entities/User";
import { IUserRepository } from "../gateway/IUserRepository";

interface UpdateUseCase {
    id: string,
    updateProps: any,
}

export class UpdateUser implements IUseCase<User> {

    userRepository: IUserRepository;

    constructor({ userRepository }: UserUseCaseProps) {
        this.userRepository = userRepository;
    }

    execute({ id, updateProps }: UpdateUseCase): Promise<User> {
        return this.userRepository.updateUser(id, updateProps);
    }

}