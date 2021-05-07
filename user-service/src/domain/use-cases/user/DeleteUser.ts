import { IUseCase, UserUseCaseProps } from "../types";
import { IUserRepository } from "../../gateway/IUserRepository";
import { IUser } from "../../entities/types";

export class DeleteUser implements IUseCase<IUser> {

    userRepository: IUserRepository;

    constructor({ userRepository }: UserUseCaseProps) {
        this.userRepository = userRepository;
    }

    execute(props: string): Promise<IUser> {
        return this.userRepository.deleteUser(props);
    }

}