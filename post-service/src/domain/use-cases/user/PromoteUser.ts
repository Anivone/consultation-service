import { IUseCase, PostUserUseCaseProps } from "../types";
import { IPostUserRepository } from "../../gateway/IPostUserRepository";
import { IPostUser, IRating } from "../../entities/types";
import { CreateRating } from "../rating/CreateRating";
import to from "await-to-js";

interface PromoteUserProps {
    createRating: CreateRating;
}

export class PromotePostUser implements IUseCase<IPostUser> {

    postUserRepository: IPostUserRepository;
    createRating: CreateRating;

    constructor({ postUserRepository, createRating }: PostUserUseCaseProps & PromoteUserProps) {
        this.postUserRepository = postUserRepository;
        this.createRating = createRating;
    }

    async execute(id: string): Promise<IPostUser> {
        const [err, rating] = await to<IRating>(this.createRating.execute({}));
        if (err) throw err;

        return this.postUserRepository.updatePostUser(id,
            { isConsultant: true, ratingID: rating._id });
    }

}