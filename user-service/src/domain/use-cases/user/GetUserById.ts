import { IUseCase, UserUseCaseProps } from "../types";
import { IPostUserRepository } from "../../gateway/IUserRepository";
import { IUser } from "../../entities/types";

export class GetUserById implements IUseCase<IUser> {

    userRepository: IPostUserRepository;

    constructor({ userRepository }: UserUseCaseProps) {
        this.userRepository = userRepository;
    }

    execute(props: string): Promise<IUser> {
        return this.userRepository.getUserById(props);
    }

}