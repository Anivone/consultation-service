import { IUseCase, PostUserUseCaseProps } from "../types";
import { IPostUserRepository } from "../../gateway/IPostUserRepository";
import { IPostUser } from "../../entities/types";

interface UpdateUseCase {
    id: string,
    updateProps: any,
}

export class UpdatePostUser implements IUseCase<IPostUser> {

    postUserRepository: IPostUserRepository;

    constructor({ postUserRepository }: PostUserUseCaseProps) {
        this.postUserRepository = postUserRepository;
    }

    execute({ id, updateProps }: UpdateUseCase): Promise<IPostUser> {
        return this.postUserRepository.updatePostUser(id, updateProps);
    }

}