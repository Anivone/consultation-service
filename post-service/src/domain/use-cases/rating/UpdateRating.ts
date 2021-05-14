import { IUseCase, RatingUseCaseProps } from "../types";
import { IRatingRepository } from "../../gateway/IRatingRepository";
import { IPostUser, IRating } from "../../entities/types";
import { GetPostUsers } from "../user/GetPostUsers";
import to from "await-to-js";

interface UpdateUseCase {
    id: string,
    updateProps: any,
}

interface UpdateRatingProps {
    getPostUsers: GetPostUsers;
}

export class UpdateRating implements IUseCase<IRating> {

    ratingRepository: IRatingRepository;
    getPostUsers: GetPostUsers;

    constructor({ ratingRepository, getPostUsers }: RatingUseCaseProps & UpdateRatingProps) {
        this.ratingRepository = ratingRepository;
        this.getPostUsers = getPostUsers;
    }

    async execute({ id, updateProps }: UpdateUseCase): Promise<IRating> {
        const [err, users] = await to<IPostUser[]>(this.getPostUsers.execute({userID: id}));
        if (err) throw err;
        if (!users[0]) throw new Error('PostUser with such userID does not exist');

        return this.ratingRepository.updateRating(users[0].ratingID, updateProps);
    }

}