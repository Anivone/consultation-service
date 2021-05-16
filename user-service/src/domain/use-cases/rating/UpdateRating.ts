import { IUseCase, RatingUseCaseProps } from "../types";
import { IRatingRepository } from "../../gateway/IRatingRepository";
import { IRating, IUser } from "../../entities/types";
import to from "await-to-js";
import { GetUserById } from "../user/GetUserById";

interface UpdateUseCase {
    id: string,
    updateProps: any,
}

interface UpdateRatingProps {
    getUserById: GetUserById;
}

export class UpdateRating implements IUseCase<IRating> {

    ratingRepository: IRatingRepository;
    getUserById: GetUserById;

    constructor({ ratingRepository, getUserById }: RatingUseCaseProps & UpdateRatingProps) {
        this.ratingRepository = ratingRepository;
        this.getUserById = getUserById;
    }

    async execute({ id, updateProps }: UpdateUseCase): Promise<IRating> {
        const [err, user] = await to<IUser>(this.getUserById.execute(id));
        if (err) throw err;

        return this.ratingRepository.updateRating(user.ratingID, updateProps);
    }

}