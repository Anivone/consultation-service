import { IUser } from "../../domain/entities/types";
import axios from "axios";
import to from "await-to-js";

export async function createUsers(user: IUser) {
    let err;
    [err] = await to<any>(axios.post(
        `http://localhost:${process.env.CONSULTATION_SERVICE_PORT}/consultations/users`, {
            ...user,
            userID: user._id,
        })
    );
    if (err) throw err;

    [err] = await to<any>(axios.post(
        `http://localhost:${process.env.POST_SERVICE_PORT}/posts/users`, {
            ...user,
            userID: user._id,
        })
    );
    if (err) throw err;

    [err] = await to<any>(axios.post(
        `http://localhost:${process.env.RECOMMENDATION_SERVICE_PORT}/recommendations/user-tags`, {
            userID: user._id,
            tags: [],
        })
    );
    if (err) throw err;

}