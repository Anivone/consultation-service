import { IUserRepository } from "../gateway/IUserRepository";
import { User } from "../entities/User";
import { IUseCase, UserUseCaseProps } from "./types";
import { IUser } from "../entities/types";

export class CreateUser implements IUseCase<User> {

    userRepository: IUserRepository;

    constructor({ userRepository }: UserUseCaseProps) {
        this.userRepository = userRepository;
    }

    execute(props: IUser): Promise<User> {
        const user = new User(props);

        return this.userRepository.createUser(user);
    }

}