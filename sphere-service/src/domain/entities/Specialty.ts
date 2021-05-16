import { ISpecialty } from "./types";

export class Specialty {

    _id?: string;
    name: string;
    consultationsNumber?: number;
    postsNumber?: number;

    constructor({ _id, name, consultationsNumber = 0, postsNumber = 0 }: ISpecialty) {
        this._id = _id;
        this.name = name;
        this.consultationsNumber = consultationsNumber;
        this.postsNumber = postsNumber;
    }

}