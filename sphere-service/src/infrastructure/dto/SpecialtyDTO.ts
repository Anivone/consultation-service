import { ISpecialtyDocument } from "../../data/schemas/SpecialtySchema";
import { Specialty } from "../../domain/entities/Specialty";

export default class SpecialtyDTO extends Specialty {

    readonly _id: string;

    constructor(specialtyDocument: ISpecialtyDocument) {
        super({
            sphereID: specialtyDocument.sphereID,
            name: specialtyDocument.name,
            consultationsNumber: specialtyDocument.consultationsNumber,
            postsNumber: specialtyDocument.postsNumber
        });

        this._id = specialtyDocument._id.toString();
    }

}