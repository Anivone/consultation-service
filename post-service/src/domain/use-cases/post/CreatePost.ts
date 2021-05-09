import { IPostRepository } from "../../gateway/IPostRepository";
import { IUseCase, PostUseCaseProps } from "../types";
import { IPost } from "../../entities/types";

export class CreatePost implements IUseCase<IPost> {

    postRepository: IPostRepository;

    constructor({ postRepository }: PostUseCaseProps) {
        this.postRepository = postRepository;
    }

    execute(props: IPost): Promise<IPost> {
        return this.postRepository.createPost(props);
    }

}