import { ISpecialty } from "./types";

export class Specialty {

    _id?: string;
    name: string;

    constructor({ _id, name }: ISpecialty) {
        this._id = _id;
        this.name = name;
    }

}