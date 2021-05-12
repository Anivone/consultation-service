import { IUseCase, UserTagsUseCaseProps } from "../types";
import { IUserTagsRepository } from "../../gateway/IUserTagsRepository";
import { IUserTags } from "../../entities/types";

interface UpdateUseCase {
    id: string,
    updateProps: any,
}

export class UpdateUserTags implements IUseCase<IUserTags> {

    userTagsRepository: IUserTagsRepository;

    constructor({ userTagsRepository }: UserTagsUseCaseProps) {
        this.userTagsRepository = userTagsRepository;
    }

    execute({ id, updateProps }: UpdateUseCase): Promise<IUserTags> {
        return this.userTagsRepository.updateUserTags(id, updateProps);
    }

}