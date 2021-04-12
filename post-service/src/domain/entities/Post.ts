import { IPost, Status } from "./types";

export class Post {

    title: string;
    description: string;
    userID: string;
    relevance: number;
    date: {
        day: number,
        month: number,
        year: number
    };
    views: number;
    sphereID: string;
    status: Status;
    edited: boolean;

    constructor({
                    title, description, userID, relevance, date, views, sphereID, status, edited
                }: IPost) {
        this.title = title;
        this.description = description;
        this.userID = userID;
        this.relevance = relevance;
        this.date = date;
        this.views = views;
        this.sphereID = sphereID;
        this.status = status;
        this.edited = edited;
    }

}