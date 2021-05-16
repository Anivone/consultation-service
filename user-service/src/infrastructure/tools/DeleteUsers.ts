import axios from "axios";
import to from "await-to-js";

export async function deleteUsers(userID: string) {
    console.log('[X] duplicates userID: ', userID);
    let err, response;
    [err, response] = await to<any>(axios.delete(
        `http://localhost:${process.env.CONSULTATION_SERVICE_PORT}/consultations/users/${userID}`)
    );
    if (err) throw err;
    console.log('[X] deleteUsers data: ', response.data);

    [err, response] = await to<any>(axios.delete(
        `http://localhost:${process.env.POST_SERVICE_PORT}/posts/users/${userID}`)
    );
    if (err) throw err;
    console.log('[X] deleteUsers data: ', response.data);

    [err, response] = await to<any>(axios.delete(
        `http://localhost:${process.env.RECOMMENDATION_SERVICE_PORT}/recommendations/user-tags/${userID}`)
    );
    if (err) throw err;
    console.log('[X] deleteUsers data: ', response.data);

}