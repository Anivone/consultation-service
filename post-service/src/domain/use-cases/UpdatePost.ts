import { IUseCase } from "./IUseCase";
import { Post } from "../entities/Post";
import { IPostRepository } from "../gateway/IPostRepository";
import { IPost } from "../entities/types";

export class UpdatePost implements IUseCase<Post> {

    postRepository: IPostRepository;

    constructor(postRepository: IPostRepository) {
        this.postRepository = postRepository;
    }

    execute(props: any): Promise<void> {
        return this.postRepository.updatePost(props);
    }

}