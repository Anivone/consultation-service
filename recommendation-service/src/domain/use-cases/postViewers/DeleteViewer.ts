import { IUseCase, PostViewersUseCaseProps } from "../types";
import { IPostViewersRepository } from "../../gateway/IPostViewersRepository";
import { IPostViewers } from "../../entities/types";

interface UpdateUseCase {
    id: string,
    viewerID: string,
}

export class DeleteViewer implements IUseCase<IPostViewers> {

    postViewersRepository: IPostViewersRepository;

    constructor({ postViewersRepository }: PostViewersUseCaseProps) {
        this.postViewersRepository = postViewersRepository;
    }

    execute({ id, viewerID }: UpdateUseCase): Promise<IPostViewers> {
        return this.postViewersRepository.updatePostViewers(id,
            {
                $pull: {
                    viewers: viewerID
                }
            });
    }

}