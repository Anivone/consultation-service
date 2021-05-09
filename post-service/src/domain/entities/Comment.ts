import { IComment } from "./types";

export class Comment {

    _id?: string;
    text: string;
    userID: string;
    postID: string;
    points?: number;
    date: {
        day: number,
        month: number,
        year: number
    };

    constructor({ _id, text, userID, postID, points, date }: IComment) {
        this._id = _id;
        this.text = text;
        this.userID = userID;
        this.postID = postID;
        this.points = points;
        this.date = date;
    }

}