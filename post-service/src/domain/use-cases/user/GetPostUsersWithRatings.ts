import { IPostUser, IRating } from "../../entities/types";
import { GetPostUsers } from "./GetPostUsers";
import { GetRatings } from "../rating/GetRatings";
import to from "await-to-js";

interface GetPostUsersWithRatingsProps {
    getPostUsers: GetPostUsers;
    getRatings: GetRatings;
}

export class GetPostUsersWithRatings {
    private getRatings: GetRatings;
    private getPostUsers: GetPostUsers;

    constructor({getPostUsers, getRatings}: GetPostUsersWithRatingsProps) {
        this.getPostUsers = getPostUsers;
        this.getRatings = getRatings;
    }

    async execute(props: any): Promise<any> {
        const [err, users] = await to<IPostUser[]>(this.getPostUsers.execute(props));
        if (err) throw err;
        const [err2, ratings] = await to<IRating[]>(this.getRatings.execute({}));
        if (err) throw err2;

        return users.map(user => {
            return {
                ...user,
                rating: this.calculateRating(
                    ratings.find(ratings => ratings._id === user.ratingID)),
            }
        })
    }

    calculateRating(rating: IRating) {
        const multiplication =
            5 * rating.five +
            4 * rating.four +
            3 * rating.three +
            2 * rating.two +
            rating.one

        if (multiplication === 0) return 0;

        return (multiplication === 0
            ? 0
            : multiplication / (rating.five + rating.four + rating.three + rating.two + rating.one)).toPrecision(2);
    }
}