import { IUseCase, RatingUseCaseProps } from "../types";
import { IRatingRepository } from "../../gateway/IRatingRepository";
import { IRating } from "../../entities/types";

export class DeleteRating implements IUseCase<IRating> {

    ratingRepository: IRatingRepository;

    constructor({ ratingRepository }: RatingUseCaseProps) {
        this.ratingRepository = ratingRepository;
    }

    execute(props: string): Promise<IRating> {
        return this.ratingRepository.deleteRating(props);
    }

}