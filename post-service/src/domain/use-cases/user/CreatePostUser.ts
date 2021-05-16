import { IUseCase, PostUserUseCaseProps } from "../types";
import { IRating, IPostUser } from "../../entities/types";
import { IPostUserRepository } from "../../gateway/IPostUserRepository";
import { CreateRating } from "../rating/CreateRating";
import to from "await-to-js";

interface CreatePostUserProps {
    createRating: CreateRating;
}

export class CreatePostUser implements IUseCase<IPostUser> {

    private postUserRepository: IPostUserRepository;
    private createRating: CreateRating;

    constructor({ postUserRepository, createRating }: PostUserUseCaseProps & CreatePostUserProps) {
        this.postUserRepository = postUserRepository;
        this.createRating = createRating;
    }

    async execute(props: IPostUser): Promise<IPostUser> {
        const [err, user] = await to<IPostUser>(this.postUserRepository.createPostUser(props));
        if (err) throw err;

        const [err2, rating] = await to<IRating>(this.createRating.execute({}));
        if (err2) throw err2;

        const [err3, newPostUser] = await to<IPostUser>(
            this.postUserRepository.updatePostUser(user._id, {ratingID: rating._id}));
        if (err3) throw err3;

        return newPostUser;
    }

}