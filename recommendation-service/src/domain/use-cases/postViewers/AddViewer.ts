import { IUseCase, PostViewersUseCaseProps } from "../types";
import { IPostViewers } from "../../entities/types";
import { IPostViewersRepository } from "../../gateway/IPostViewersRepository";

interface UpdatePostViewersProps {
    id: string,
    viewerID: string,
}

export class AddViewer implements IUseCase<IPostViewers> {

    postViewersRepository: IPostViewersRepository;

    constructor({ postViewersRepository }: PostViewersUseCaseProps) {
        this.postViewersRepository = postViewersRepository;
    }

    execute({ id, viewerID }: UpdatePostViewersProps): Promise<IPostViewers> {
        return this.postViewersRepository.updatePostViewers(id,
            {
                $push: { viewers: viewerID }
            });
    }

}