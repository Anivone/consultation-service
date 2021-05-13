import { IConsultUser } from "./types";

export class ConsultUser {

    _id?: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    phoneNumber: string;
    isConsultant: boolean;
    specialtyID?: string;
    consultationsNumber?: number;
    reviewsNumber?: number;
    ratingID?: string;

    constructor({
                    _id,
                    firstName,
                    lastName,
                    middleName,
                    phoneNumber,
                    isConsultant,
                    specialtyID ,
                    consultationsNumber,
                    reviewsNumber,
                    ratingID,
                }: IConsultUser) {
        this._id = _id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.phoneNumber = phoneNumber;
        this.isConsultant = isConsultant;
        this.specialtyID = specialtyID;
        this.consultationsNumber = consultationsNumber;
        this.reviewsNumber = reviewsNumber;
        this.ratingID = ratingID;
    }

}