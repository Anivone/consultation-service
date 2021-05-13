import { IUser } from "../../domain/entities/types";
import axios from "axios";

export async function sendDuplicates(user: IUser) {
    await axios.post(`http://localhost:${process.env.POST_SERVICE_PORT}/posts/users`, user);


}