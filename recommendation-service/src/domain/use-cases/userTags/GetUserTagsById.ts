import { IUseCase, UserTagsUseCaseProps } from "../types";
import { IUserTagsRepository } from "../../gateway/IUserTagsRepository";
import { IUserTags } from "../../entities/types";

export class GetUserTagsById implements IUseCase<IUserTags> {

    userTagsRepository: IUserTagsRepository;

    constructor({ userTagsRepository }: UserTagsUseCaseProps) {
        this.userTagsRepository = userTagsRepository;
    }

    execute(props: string): Promise<IUserTags> {
        return this.userTagsRepository.getUserTagsById(props);
    }

}