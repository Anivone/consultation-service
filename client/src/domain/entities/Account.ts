import { IAccount, Role } from "./types";

export class Account {
    _id?: string;
    email: string;
    userID: string;
    role: Role;

    constructor({_id, email, userID, role}: IAccount) {
        this._id = _id;
        this.email = email;
        this.userID = userID;
        this.role = role;
    }
}