import { IUseCase, UserUseCaseProps } from "./types";
import { User } from "../entities/User";
import { IUserRepository } from "../gateway/IUserRepository";

export class DeleteUser implements IUseCase<User> {

    userRepository: IUserRepository;

    constructor({ userRepository }: UserUseCaseProps) {
        this.userRepository = userRepository;
    }

    execute(props: string): Promise<User> {
        return this.userRepository.deleteUser(props);
    }

}