import { ISphereDocument } from "../../data/schemas/SphereModel";
import { Sphere } from "../../domain/entities/Sphere";

export default class SphereDTO extends Sphere {

    readonly _id: string;

    constructor(postDocument: ISphereDocument) {
        super({
            name: postDocument.name,
            specialties: postDocument.specialties,
        });

        this._id = postDocument._id.toString();
    }

}