import { IAccount, Role } from "./types";

export class Account {
    _id?: string;
    email: string;
    password: string;
    userID: string;
    role: Role;

    constructor({_id, email, password, userID, role}: IAccount) {
        this._id = _id;
        this.email = email;
        this.password = password;
        this.userID = userID;
        this.role = role;
    }
}