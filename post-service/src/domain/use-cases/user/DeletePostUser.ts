import { IUseCase, PostUserUseCaseProps } from "../types";
import { IPostUserRepository } from "../../gateway/IPostUserRepository";
import { IPostUser } from "../../entities/types";
import to from "await-to-js";
import { DeleteRating } from "../rating/DeleteRating";
import { GetPostUsers } from "./GetPostUsers";

interface DeletePostUserProps {
    deleteRating: DeleteRating;
    getPostUsers: GetPostUsers;
}

export class DeletePostUser implements IUseCase<IPostUser> {

    postUserRepository: IPostUserRepository;
    deleteRating: DeleteRating;
    getPostUsers: GetPostUsers;

    constructor({ postUserRepository, deleteRating, getPostUsers }: PostUserUseCaseProps & DeletePostUserProps) {
        this.postUserRepository = postUserRepository;
        this.deleteRating = deleteRating;
        this.getPostUsers = getPostUsers;
    }

    async execute(userID: string): Promise<IPostUser> {
        const [err, users] = await to<IPostUser[]>(this.getPostUsers.execute({userID}));
        if (err) throw err;
        if (!users[0]) throw new Error('PostUser with such userID does not exist');

        const user = users[0];

        const [err2, rating] = await to(this.deleteRating.execute(user.ratingID));
        if (err2) throw err2;

        const [err4] = await to(this.postUserRepository.deletePostUser(user._id));
        if (err4) throw err4;

        return user;
    }

}