import { IUseCase, UseCaseProps } from "./types";
import { Post } from "../entities/Post";
import { IPostRepository } from "../gateway/IPostRepository";
import { IPost } from "../entities/types";

interface UpdateUseCase {
    id: string,
    updateProps: any,
}

export class UpdatePost implements IUseCase<Post> {

    postRepository: IPostRepository;

    constructor({ postRepository }: UseCaseProps) {
        this.postRepository = postRepository;
    }

    execute({ id, updateProps }: UpdateUseCase): Promise<Post> {
        return this.postRepository.updatePost(id, updateProps);
    }

}