import { IConsultation } from "./types";

export class Consultation {

    title: string;
    userID: string;
    consultantID: string;
    sphereID: string;
    specialty: string;
    companyName?: string;
    description: string;
    price: number;

    constructor({
                    title, userID, consultantID, sphereID, specialty, companyName, description, price,
                }: IConsultation) {
        this.title = title;
        this.userID = userID;
        this.consultantID = consultantID;
        this.sphereID = sphereID;
        this.specialty = specialty;
        this.companyName = companyName;
        this.description = description;
        this.price = price;
    }

}