import { IUseCase, RatingUseCaseProps } from "../types";
import { IRatingRepository } from "../../gateway/IRatingRepository";
import { IRating } from "../../entities/types";

export class GetRatingById implements IUseCase<IRating> {

    ratingRepository: IRatingRepository;

    constructor({ ratingRepository }: RatingUseCaseProps) {
        this.ratingRepository = ratingRepository;
    }

    execute(props: string): Promise<IRating> {
        return this.ratingRepository.getRatingById(props);
    }

}