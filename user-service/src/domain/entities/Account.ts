import { IAccount, Role } from "./types";

export class Account {
    email: string;
    password: string;
    userID: string;
    role: Role;

    constructor({email, password, userID, role}: IAccount) {
        this.email = email;
        this.password = password;
        this.userID = userID;
        this.role = role;
    }
}