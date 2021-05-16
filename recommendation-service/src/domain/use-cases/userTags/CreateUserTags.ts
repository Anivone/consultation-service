import { IUserTagsRepository } from "../../gateway/IUserTagsRepository";
import { IUseCase, UserTagsUseCaseProps } from "../types";
import { IUserTags } from "../../entities/types";

export class CreateUserTags implements IUseCase<IUserTags> {

    userTagsRepository: IUserTagsRepository;

    constructor({ userTagsRepository }: UserTagsUseCaseProps) {
        this.userTagsRepository = userTagsRepository;
    }

    execute(props: IUserTags): Promise<IUserTags> {
        return this.userTagsRepository.createUserTags(props);
    }

}