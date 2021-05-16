import { IUseCase, PostViewersUseCaseProps } from "../types";
import { IPostViewersRepository } from "../../gateway/IPostViewersRepository";
import { IPostViewers } from "../../entities/types";

export class GetPostViewers implements IUseCase<IPostViewers> {

    postViewersRepository: IPostViewersRepository;

    constructor({ postViewersRepository }: PostViewersUseCaseProps) {
        this.postViewersRepository = postViewersRepository;
    }

    execute(props: any): Promise<IPostViewers[]> {
        return this.postViewersRepository.getPostViewers(props);
    }

}