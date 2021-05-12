import { IUseCase, UserTagsUseCaseProps } from "../types";
import { IUserTags } from "../../entities/types";
import { IUserTagsRepository } from "../../gateway/IUserTagsRepository";

interface UpdateUserTagsProps {
    id: string,
    tagName: string,
}

export class AddTag implements IUseCase<IUserTags> {

    userTagsRepository: IUserTagsRepository;

    constructor({ userTagsRepository }: UserTagsUseCaseProps) {
        this.userTagsRepository = userTagsRepository;
    }

    execute({ id, tagName }: UpdateUserTagsProps): Promise<IUserTags> {
        return this.userTagsRepository.updateUserTags(id,
            {
                $push: { tags: tagName }
            });
    }

}