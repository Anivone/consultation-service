import { IComment, Status } from "./types";

export class Comment {

    text: string;
    userID: string;
    postID: string;
    points: number;
    date: {
        day: number,
        month: number,
        year: number
    };
    status: Status;

    constructor({
                    text, userID, postID, points, date, status
                }: IComment) {
        this.text = text;
        this.userID = userID;
        this.postID = postID;
        this.points = points;
        this.date = date;
        this.status = status;
    }

}