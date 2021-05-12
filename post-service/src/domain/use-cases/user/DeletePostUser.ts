import { IUseCase, PostUserUseCaseProps } from "../types";
import { IPostUserRepository } from "../../gateway/IPostUserRepository";
import { IPostUser } from "../../entities/types";
import to from "await-to-js";
import { DeleteRating } from "../rating/DeleteRating";

interface DeletePostUserProps {
    deleteRating: DeleteRating;
}

export class DeletePostUser implements IUseCase<IPostUser> {

    postUserRepository: IPostUserRepository;
    deleteRating: DeleteRating;

    constructor({ postUserRepository, deleteRating }: PostUserUseCaseProps & DeletePostUserProps) {
        this.postUserRepository = postUserRepository;
        this.deleteRating = deleteRating;
    }

    async execute(props: string): Promise<IPostUser> {
        const [err, user] = await to<IPostUser>(this.postUserRepository.getPostUserById(props));
        if (err) throw err;

        const [err2, rating] = await to(this.deleteRating.execute(user.ratingID));
        if (err2) throw err2;

        const [err4] = await to(this.postUserRepository.deletePostUser(user._id));
        if (err4) throw err4;

        return user;
    }

}