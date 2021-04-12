import { IUseCase } from "./IUseCase";
import { Post } from "../entities/Post";
import { IPostRepository } from "../gateway/IPostRepository";
import { IPost } from "../entities/types";

export class GetPosts implements IUseCase<Post> {

    postRepository: IPostRepository;

    constructor(postRepository: IPostRepository) {
        this.postRepository = postRepository;
    }

    execute(props: any): Promise<Post[]> {
        return this.postRepository.getPosts(props);
    }

}