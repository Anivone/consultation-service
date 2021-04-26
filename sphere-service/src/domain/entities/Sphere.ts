import { ISphere, Specialty } from "./types";

export class Sphere {

    name: string;
    specialties: Specialty[];

    constructor({
                    name, specialties
                }: ISphere) {
        this.name = name;
        this.specialties = specialties;
    }

}