import { IUseCase, PostViewersUseCaseProps } from "../types";
import { IPostViewersRepository } from "../../gateway/IPostViewersRepository";
import { IPostViewers } from "../../entities/types";

interface UpdateUseCase {
    id: string,
    updateProps: any,
}

export class UpdatePostViewers implements IUseCase<IPostViewers> {

    postViewersRepository: IPostViewersRepository;

    constructor({ postViewersRepository }: PostViewersUseCaseProps) {
        this.postViewersRepository = postViewersRepository;
    }

    execute({ id, updateProps }: UpdateUseCase): Promise<IPostViewers> {
        return this.postViewersRepository.updatePostViewers(id, updateProps);
    }

}