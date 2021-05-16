import { IUseCase, PostUseCaseProps } from "../types";
import { IPostRepository } from "../../gateway/IPostRepository";
import { IPost } from "../../entities/types";

export class DeletePost implements IUseCase<IPost> {

    postRepository: IPostRepository;

    constructor({ postRepository }: PostUseCaseProps) {
        this.postRepository = postRepository;
    }

    execute(props: string): Promise<IPost> {
        return this.postRepository.deletePost(props);
    }

}