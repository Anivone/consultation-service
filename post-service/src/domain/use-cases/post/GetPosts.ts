import { IUseCase, PostUseCaseProps } from "../types";
import { IPostRepository } from "../../gateway/IPostRepository";
import { IPost } from "../../entities/types";

export class GetPosts implements IUseCase<IPost> {

    postRepository: IPostRepository;

    constructor({ postRepository }: PostUseCaseProps) {
        this.postRepository = postRepository;
    }

    execute(props: any): Promise<IPost[]> {
        return this.postRepository.getPosts(props);
    }

}