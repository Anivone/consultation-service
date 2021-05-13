import { IRating } from "../entities/types";

export interface IRatingRepository {

    getRatings(filter?: any): Promise<IRating[]>;

    getRatingById(ratingID: string): Promise<IRating>;

    createRating(ratingProps: IRating): Promise<IRating>;

    updateRating(ratingID: string, updateProps: any): Promise<IRating>;

    deleteRating(ratingID: string): Promise<IRating>;

}