import { IUseCase, PostUserUseCaseProps } from "../types";
import { IPostUserRepository } from "../../gateway/IPostUserRepository";
import { IPostUser } from "../../entities/types";

export class GetPostUserById implements IUseCase<IPostUser> {

    postUserRepository: IPostUserRepository;

    constructor({ postUserRepository }: PostUserUseCaseProps) {
        this.postUserRepository = postUserRepository;
    }

    execute(props: string): Promise<IPostUser> {
        return this.postUserRepository.getPostUserById(props);
    }

}