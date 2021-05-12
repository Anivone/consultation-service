import { IPostUser } from "./types";

export class PostUser {

    _id?: string;
    firstName: string;
    lastName: string;
    isConsultant: boolean;
    specialtyID?: string;
    ratingID?: string;

    constructor({
                    _id,
                    firstName,
                    lastName,
                    isConsultant,
                    specialtyID ,
                    ratingID,
                }: IPostUser) {
        this._id = _id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.isConsultant = isConsultant;
        this.specialtyID = specialtyID;
        this.ratingID = ratingID;
    }

}