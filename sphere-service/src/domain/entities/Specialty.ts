import { ISpecialty } from "./types";

export class Specialty {

    sphereID: string;
    name: string;
    consultationsNumber: number;
    postsNumber: number;

    constructor({sphereID, name, consultationsNumber = 0, postsNumber = 0}: ISpecialty) {
        this.sphereID = sphereID;
        this.name = name;
        this.consultationsNumber = consultationsNumber;
        this.postsNumber = postsNumber;
    }

}