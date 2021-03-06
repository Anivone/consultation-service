import { IPost, Status } from "./types";

export class Post {

    _id?: string;
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
    specialty: string;
    status: Status;
    edited: boolean;

    constructor({
                    _id,
                    title,
                    description,
                    userID,
                    relevance,
                    tags,
                    date,
                    views,
                    specialty,
                    status,
                    edited
                }: IPost) {
        this._id = _id;
        this.title = title;
        this.description = description;
        this.userID = userID;
        this.relevance = relevance;
        this.tags = tags;
        this.date = date;
        this.views = views;
        this.specialty = specialty;
        this.status = status;
        this.edited = edited;
    }

}