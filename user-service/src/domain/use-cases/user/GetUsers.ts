import { IUseCase, UserUseCaseProps } from "../types";
import { IPostUserRepository } from "../../gateway/IUserRepository";
import { IUser } from "../../entities/types";

export class GetUsers implements IUseCase<IUser> {

    userRepository: IPostUserRepository;

    constructor({ userRepository }: UserUseCaseProps) {
        this.userRepository = userRepository;
    }

    execute(props: any): Promise<IUser[]> {
        return this.userRepository.getUsers(props);
    }

}