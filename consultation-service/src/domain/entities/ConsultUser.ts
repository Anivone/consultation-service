import { IConsultUser } from "./types";

export class ConsultUser {

    _id?: string;
    userID: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    phoneNumber: string;
    isConsultant: boolean;
    specialtyID?: string;
    consultationsNumber?: number;
    ratingID?: string;

    constructor({
                    _id,
                    userID,
                    firstName,
                    lastName,
                    middleName,
                    phoneNumber,
                    isConsultant,
                    specialtyID ,
                    consultationsNumber,
                    ratingID,
                }: IConsultUser) {
        this._id = _id;
        this.userID = userID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.phoneNumber = phoneNumber;
        this.isConsultant = isConsultant;
        this.specialtyID = specialtyID;
        this.consultationsNumber = consultationsNumber;
        this.ratingID = ratingID;
    }

}