import { IUserTags } from "./types";

export class UserTags {

    _id?: string;
    userID: string;
    tags: [];

    constructor({_id, userID, tags}: IUserTags) {
        this._id = _id;
        this.userID = userID;
        this.tags = tags;
    }

}