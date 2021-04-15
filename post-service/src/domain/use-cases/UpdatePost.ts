import { IUseCase, UseCaseProps } from "./types";
import { Post } from "../entities/Post";
import { IPostRepository } from "../gateway/IPostRepository";
import { IPost } from "../entities/types";

interface UpdateUseCase {
    postID: string,
    updateProps: any,
}

export class UpdatePost implements IUseCase<Post> {

    postRepository: IPostRepository;

    constructor({ postRepository }: UseCaseProps) {
        this.postRepository = postRepository;
    }

    execute({ postID, updateProps }: UpdateUseCase): Promise<void> {
        return this.postRepository.updatePost(postID, updateProps);
    }

}