import { IUseCase } from "./IUseCase";
import { Post } from "../entities/Post";
import { IPostRepository } from "../gateway/IPostRepository";
import { IPost } from "../entities/types";

export class DeletePost implements IUseCase<Post> {

    postRepository: IPostRepository;

    constructor(postRepository: IPostRepository) {
        this.postRepository = postRepository;
    }

    execute(props: string): Promise<void> {
        return this.postRepository.deletePost(props);
    }

}