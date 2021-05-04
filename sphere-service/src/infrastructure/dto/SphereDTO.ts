import { ISphereDocument } from "../../data/schemas/SphereSchema";
import { Sphere } from "../../domain/entities/Sphere";

export default class SphereDTO extends Sphere {

    readonly _id: string;

    constructor(sphereDocument: ISphereDocument) {
        super({
            name: sphereDocument.name,
        });

        this._id = sphereDocument._id.toString();
    }

}