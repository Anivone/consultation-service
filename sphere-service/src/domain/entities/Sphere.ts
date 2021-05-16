import { ISpecialty, ISphere } from "./types";

export class Sphere {

    _id?: string;
    name: string;
    specialties?: ISpecialty[];
    tags?: string[];

    constructor({ _id, name, specialties, tags }: ISphere) {
        this._id = _id;
        this.name = name;
        this.specialties = specialties;
        this.tags = tags;
    }

}