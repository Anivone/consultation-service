import { IUser } from "./types";

export class User {

    _id?: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    phoneNumber: string;
    location: {
        country: string,
        city: string
    };
    description: string;
    posts: number;
    comments: number;
    isConsultant: boolean;
    position?: string;
    consultationsNumber?: number;
    reviewsNumber?: number;
    ratingID?: string;

    constructor({
                    _id,
                    firstName,
                    lastName,
                    middleName,
                    phoneNumber,
                    location,
                    description,
                    posts,
                    comments,
                    isConsultant,
                    position,
                    consultationsNumber,
                    reviewsNumber,
                    ratingID,
                }: IUser) {
        this._id = _id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.phoneNumber = phoneNumber;
        this.location = location;
        this.description = description;
        this.posts = posts;
        this.comments = comments;
        this.isConsultant = isConsultant;
        this.position = position;
        this.consultationsNumber = consultationsNumber;
        this.reviewsNumber = reviewsNumber;
        this.ratingID = ratingID;
    }

}