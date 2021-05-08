import { IRatingRepository } from "../../domain/gateway/IRatingRepository";
import { IRating } from "../../domain/entities/types";
import { IRatingModel } from "../schemas/RatingSchema";
import to from "await-to-js";
import { Rating } from "../../domain/entities/Rating";

interface RatingRepositoryProps {
    RatingModel: IRatingModel;
}

export class RatingRepository implements IRatingRepository {

    RatingModel: IRatingModel;

    constructor({ RatingModel }: RatingRepositoryProps) {
        this.RatingModel = RatingModel;
    }

    async createRating(ratingProps: IRating): Promise<Rating> {
        const [err, rating] = await to<IRating>(new this.RatingModel({
            one: ratingProps.one,
            two: ratingProps.two,
            three: ratingProps.three,
            four: ratingProps.four,
            five: ratingProps.five
        }).save());

        if (err) throw new Error(err.message);

        return new Rating(rating);
    }

    async deleteRating(ratingID: string): Promise<Rating> {
        return new Rating(await this.RatingModel.findByIdAndRemove(ratingID));
    }

    async getRatingById(ratingID: string): Promise<Rating> {
        return new Rating(await this.RatingModel.findById(ratingID));
    }

    async getRatings(filter?: any): Promise<Rating[]> {
        const ratings = await this.RatingModel.find(filter);
        return ratings.map(rating => new Rating(rating));
    }

    async updateRating(ratingID: string, updateProps: any): Promise<Rating> {
        return new Rating(await this.RatingModel.findByIdAndUpdate(ratingID, updateProps));
    }

}