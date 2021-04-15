import { IUseCase, UseCaseProps } from "./types";
import { Post } from "../entities/Post";
import { IPostRepository } from "../gateway/IPostRepository";

export class DeletePost implements IUseCase<Post> {

    postRepository: IPostRepository;

    constructor({ postRepository }: UseCaseProps) {
        this.postRepository = postRepository;
    }

    execute(props: string): Promise<void> {
        return this.postRepository.deletePost(props);
    }

}