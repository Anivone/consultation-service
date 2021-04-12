import { IPostRepository } from "../gateway/IPostRepository";
import { Post } from "../entities/Post";
import { IUseCase } from "./IUseCase";
import { IPost } from "../entities/types";

export class CreatePost implements IUseCase<Post> {

    postRepository: IPostRepository;

    constructor(postRepository: IPostRepository) {
        this.postRepository = postRepository;
    }

    execute(props: IPost): Promise<Post> {
        const post = new Post(props);

        return this.postRepository.createPost(post);
    }

}