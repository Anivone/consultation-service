import { IUseCase, PostViewersUseCaseProps } from "../types";
import { IPostViewersRepository } from "../../gateway/IPostViewersRepository";
import { IPostViewers } from "../../entities/types";

export class GetPostViewersById implements IUseCase<IPostViewers> {

    postViewersRepository: IPostViewersRepository;

    constructor({ postViewersRepository }: PostViewersUseCaseProps) {
        this.postViewersRepository = postViewersRepository;
    }

    execute(props: string): Promise<IPostViewers> {
        return this.postViewersRepository.getPostViewersById(props);
    }

}