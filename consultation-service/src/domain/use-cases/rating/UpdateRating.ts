import { IUseCase, RatingUseCaseProps } from "../types";
import { IRatingRepository } from "../../gateway/IRatingRepository";
import { IConsultUser, IRating } from "../../entities/types";
import { GetRatings } from "./GetRatings";
import to from "await-to-js";
import { GetConsultUsers } from "../user/GetConsultUsers";

interface UpdateUseCase {
    id: string,
    updateProps: any,
}

interface UpdateRatingProps {
    getConsultUsers: GetConsultUsers;
}

export class UpdateRating implements IUseCase<IRating> {

    ratingRepository: IRatingRepository;
    getConsultUsers: GetConsultUsers;

    constructor({ ratingRepository, getConsultUsers }: RatingUseCaseProps & UpdateRatingProps) {
        this.ratingRepository = ratingRepository;
        this.getConsultUsers = getConsultUsers;
    }

    async execute({ id, updateProps }: UpdateUseCase): Promise<IRating> {
        const [err, users] = await to<IConsultUser[]>(this.getConsultUsers.execute({userID: id}));
        if (err) throw err;
        if (!users[0]) throw new Error('ConsultUser with such userID does not exist');

        return this.ratingRepository.updateRating(users[0].ratingID, updateProps);
    }

}