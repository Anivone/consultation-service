import { IConsultationDocument } from "../../data/schemas/ConsultationSchema";
import { Consultation } from "../../domain/entities/Consultation";

export default class ConsultationDTO extends Consultation{

    readonly _id: string;

    constructor(commentDocument: IConsultationDocument) {
        super({
            title: commentDocument.title,
            userID: commentDocument.userID,
            consultantID: commentDocument.consultantID,
            sphereID: commentDocument.sphereID,
            specialty: commentDocument.specialty,
            companyName: commentDocument.companyName,
            description: commentDocument.description,
            price: commentDocument.price
        });

        this._id = commentDocument._id.toString();
    }

}