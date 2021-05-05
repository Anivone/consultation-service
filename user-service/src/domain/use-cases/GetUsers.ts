import { IUseCase, UserUseCaseProps } from "./types";
import { User } from "../entities/User";
import { IUserRepository } from "../gateway/IUserRepository";

export class GetUsers implements IUseCase<User> {

    userRepository: IUserRepository;

    constructor({ userRepository }: UserUseCaseProps) {
        this.userRepository = userRepository;
    }

    execute(props: any): Promise<User[]> {
        return this.userRepository.getUsers(props);
    }

}