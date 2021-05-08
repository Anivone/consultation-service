import { IUseCase, RatingUseCaseProps } from "../types";
import { IRatingRepository } from "../../gateway/IRatingRepository";
import { IRating } from "../../entities/types";

interface UpdateUseCase {
    id: string,
    updateProps: any,
}

export class UpdateRating implements IUseCase<IRating> {

    ratingRepository: IRatingRepository;

    constructor({ ratingRepository }: RatingUseCaseProps) {
        this.ratingRepository = ratingRepository;
    }

    execute({ id, updateProps }: UpdateUseCase): Promise<IRating> {
        return this.ratingRepository.updateRating(id, updateProps);
    }

}