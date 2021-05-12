import { IUseCase, UserTagsUseCaseProps } from "../types";
import { IUserTagsRepository } from "../../gateway/IUserTagsRepository";
import { IUserTags } from "../../entities/types";

export class GetUserTags implements IUseCase<IUserTags> {

    userTagsRepository: IUserTagsRepository;

    constructor({ userTagsRepository }: UserTagsUseCaseProps) {
        this.userTagsRepository = userTagsRepository;
    }

    execute(props: any): Promise<IUserTags[]> {
        return this.userTagsRepository.getUserTags(props);
    }

}