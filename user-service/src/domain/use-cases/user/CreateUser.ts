import { IUseCase, UserUseCaseProps } from "../types";
import { IUser } from "../../entities/types";
import { IUserRepository } from "../../gateway/IUserRepository";

interface CreateUserProps {
    userRepository: IUserRepository;
}

export class CreateUser implements IUseCase<IUser> {

    private userRepository: IUserRepository;

    constructor({ userRepository }: UserUseCaseProps & CreateUserProps) {
        this.userRepository = userRepository;
    }

    execute(props: IUser): Promise<IUser> {
        return this.userRepository.createUser(props);
    }

}