import { IRatingRepository } from "../../gateway/IRatingRepository";
import { Rating } from "../../entities/Rating";
import { IUseCase, RatingUseCaseProps } from "../types";
import { IRating } from "../../entities/types";

export class CreateRating implements IUseCase<IRating> {

    ratingRepository: IRatingRepository;

    constructor({ ratingRepository }: RatingUseCaseProps) {
        this.ratingRepository = ratingRepository;
    }

    execute(props: IRating): Promise<IRating> {
        return this.ratingRepository.createRating(props);
    }

}