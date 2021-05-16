import { IPostViewersRepository } from "../../gateway/IPostViewersRepository";
import { IUseCase, PostViewersUseCaseProps } from "../types";
import { IPostViewers } from "../../entities/types";

export class CreatePostViewers implements IUseCase<IPostViewers> {

    postViewersRepository: IPostViewersRepository;

    constructor({ postViewersRepository }: PostViewersUseCaseProps) {
        this.postViewersRepository = postViewersRepository;
    }

    execute(props: IPostViewers): Promise<IPostViewers> {
        return this.postViewersRepository.createPostViewers(props);
    }

}