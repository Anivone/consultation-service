import { IPostViewers } from "./types";

export class PostViewers {

    _id?: string;
    viewersID: string[];
    tags: [];

    constructor({ _id, viewersID, tags }: IPostViewers) {
        this._id = _id;
        this.viewersID = viewersID;
        this.tags = tags;
    }

}