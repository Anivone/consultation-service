import axios from "axios";
import to from "await-to-js";
import { IRating } from "../../domain/entities/types";

export async function voteRatings(userID: string, rating: IRating) {
    let err;
    [err] = await to<any>(axios.patch(
        `http://localhost:${process.env.CONSULTATION_SERVICE_PORT}/consultations/users/ratings/${userID}`, {
            one: rating.one,
            two: rating.two,
            three: rating.three,
            four: rating.four,
            five: rating.five,
        })
    );
    if (err) throw err;

    [err] = await to<any>(axios.patch(
        `http://localhost:${process.env.POST_SERVICE_PORT}/posts/users/ratings/${userID}`, {
            one: rating.one,
            two: rating.two,
            three: rating.three,
            four: rating.four,
            five: rating.five,
        })
    );
    if (err) throw err;
}