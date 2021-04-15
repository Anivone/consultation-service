import { IUseCase, UseCaseProps } from "./types";
import { Post } from "../entities/Post";
import { IPostRepository } from "../gateway/IPostRepository";

export class GetPostById implements IUseCase<Post> {

    postRepository: IPostRepository;

    constructor({ postRepository }: UseCaseProps) {
        this.postRepository = postRepository;
    }

    execute(props: string): Promise<Post> {
        return this.postRepository.getPostById(props);
    }

}