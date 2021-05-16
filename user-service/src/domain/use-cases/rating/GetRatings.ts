import { IUseCase, RatingUseCaseProps } from "../types";
import { IRatingRepository } from "../../gateway/IRatingRepository";
import { IRating } from "../../entities/types";

export class GetRatings implements IUseCase<IRating> {

    ratingRepository: IRatingRepository;

    constructor({ ratingRepository }: RatingUseCaseProps) {
        this.ratingRepository = ratingRepository;
    }

    execute(props: any): Promise<IRating[]> {
        return this.ratingRepository.getRatings(props);
    }

}