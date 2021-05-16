import { IUseCase, PostUserUseCaseProps } from "../types";
import { IPostUserRepository } from "../../gateway/IPostUserRepository";
import { IPostUser } from "../../entities/types";
import { GetPostUsers } from "./GetPostUsers";
import to from "await-to-js";

interface UpdateUseCase {
    id: string,
    updateProps: any,
}

interface UpdatePostUserProps {
    getPostUsers: GetPostUsers;
}

export class UpdatePostUser implements IUseCase<IPostUser> {

    postUserRepository: IPostUserRepository;
    getPostUsers: GetPostUsers;

    constructor({ postUserRepository, getPostUsers }: PostUserUseCaseProps & UpdatePostUserProps) {
        this.postUserRepository = postUserRepository;
        this.getPostUsers = getPostUsers;
    }

    async execute({ id, updateProps }: UpdateUseCase): Promise<IPostUser> {
        const [err, users] = await to<IPostUser[]>(this.getPostUsers.execute({userID: id}));
        if (err) throw err;
        if (!users[0]) throw new Error('PostUser with such userID does not exist');

        return this.postUserRepository.updatePostUser(users[0]._id, updateProps);
    }

}