import { IUseCase, UserTagsUseCaseProps } from "../types";
import { IUserTagsRepository } from "../../gateway/IUserTagsRepository";
import { IUserTags } from "../../entities/types";

interface UpdateUseCase {
    id: string,
    tagName: string,
}

export class DeleteTag implements IUseCase<IUserTags> {

    userTagsRepository: IUserTagsRepository;

    constructor({ userTagsRepository }: UserTagsUseCaseProps) {
        this.userTagsRepository = userTagsRepository;
    }

    execute({ id, tagName }: UpdateUseCase): Promise<IUserTags> {
        return this.userTagsRepository.updateUserTags(id,
            {
                $pull: {
                    tags: tagName
                }
            });
    }

}