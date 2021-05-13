import { IConsultation } from "./types";

export class Consultation {

    title: string;
    userID: string;
    consultantID: string;
    specialtyID: string;
    companyName?: string;
    description: string;
    price: number;

    constructor({
                    title, userID, consultantID, specialtyID, companyName, description, price,
                }: IConsultation) {
        this.title = title;
        this.userID = userID;
        this.consultantID = consultantID;
        this.specialtyID = specialtyID;
        this.companyName = companyName;
        this.description = description;
        this.price = price;
    }

}