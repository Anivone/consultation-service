import { IUseCase, PostUseCaseProps } from "../types";
import { IPostRepository } from "../../gateway/IPostRepository";
import { IPost } from "../../entities/types";

interface UpdateUseCase {
    id: string,
    updateProps: any,
}

export class UpdatePost implements IUseCase<IPost> {

    postRepository: IPostRepository;

    constructor({ postRepository }: PostUseCaseProps) {
        this.postRepository = postRepository;
    }

    execute({ id, updateProps }: UpdateUseCase): Promise<IPost> {
        return this.postRepository.updatePost(id, updateProps);
    }

}