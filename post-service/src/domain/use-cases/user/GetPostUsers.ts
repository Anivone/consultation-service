import { IUseCase, PostUserUseCaseProps } from "../types";
import { IPostUserRepository } from "../../gateway/IPostUserRepository";
import { IPostUser } from "../../entities/types";

export class GetPostUsers implements IUseCase<IPostUser> {

    postUserRepository: IPostUserRepository;

    constructor({ postUserRepository }: PostUserUseCaseProps) {
        this.postUserRepository = postUserRepository;
    }

    execute(props: any): Promise<IPostUser[]> {
        return this.postUserRepository.getPostUsers(props);
    }

}