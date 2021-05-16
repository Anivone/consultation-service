import { IUseCase, UserTagsUseCaseProps } from "../types";
import { IUserTagsRepository } from "../../gateway/IUserTagsRepository";
import { IUserTags } from "../../entities/types";
import { GetUserTags } from "./GetUserTags";
import to from "await-to-js";

interface DeleteUserTagsProps {
    getUserTags: GetUserTags;
}

export class DeleteUserTags implements IUseCase<IUserTags> {

    userTagsRepository: IUserTagsRepository;
    getUserTags: GetUserTags;

    constructor({ userTagsRepository, getUserTags }: UserTagsUseCaseProps & DeleteUserTagsProps) {
        this.userTagsRepository = userTagsRepository;
        this.getUserTags = getUserTags;
    }

    async execute(userID: string): Promise<IUserTags> {
        const [err, userTags] = await to<IUserTags[]>(this.getUserTags.execute({userID}))
        if (err) throw err;
        if (!userTags[0]) throw new Error('UserTags with such userID does not exist');

        return this.userTagsRepository.deleteUserTags(userTags[0]._id);
    }

}