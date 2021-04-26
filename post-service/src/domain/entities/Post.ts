import { IPost, Status } from "./types";

export class Post {

    title: string;
    description: string;
    userID: string;
    relevance: number;
    tags: string[];
    date: {
        day: number,
        month: number,
        year: number
    };
    views: number;
    sphereID: string;
    specialty: string;
    status: Status;
    edited: boolean;

    constructor({
                    title, description, userID, relevance, tags, date, views, sphereID, specialty, status, edited
                }: IPost) {
        this.title = title;
        this.description = description;
        this.userID = userID;
        this.relevance = relevance;
        this.tags = tags;
        this.date = date;
        this.views = views;
        this.sphereID = sphereID;
        this.specialty = specialty;
        this.status = status;
        this.edited = edited;
    }

}