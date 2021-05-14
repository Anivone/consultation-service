import { IUser } from "../../domain/entities/types";
import axios from "axios";
import to from "await-to-js";

export async function promoteUsers(user: IUser) {
    let err;
    [err] = await to<any>(axios.patch(
        `http://localhost:${process.env.CONSULTATION_SERVICE_PORT}/consultations/users/${user._id}`, {
            isConsultant: user.isConsultant,
            specialtyID: user.specialtyID,
        })
    );
    if (err) throw err;

    [err] = await to<any>(axios.patch(
        `http://localhost:${process.env.POST_SERVICE_PORT}/posts/users/${user._id}`, {
            isConsultant: user.isConsultant,
            specialtyID: user.specialtyID,
        })
    );
    if (err) throw err;
}