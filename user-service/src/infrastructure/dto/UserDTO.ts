import { IUserDocument } from "../../data/schemas/UserSchema";
import { User } from "../../domain/entities/User";

export default class UserDTO extends User {

    readonly _id: string;

    constructor(userDocument: IUserDocument) {
        super({
            firstName: userDocument.firstName,
            lastName: userDocument.lastName,
            middleName: userDocument.middleName,
            phoneNumber: userDocument.phoneNumber,
            location: userDocument.location,
            description: userDocument.description,
            posts: userDocument.posts,
            comments: userDocument.comments,
            isConsultant: userDocument.isConsultant,
            position: userDocument.position,
            consultationsNumber: userDocument.consultationsNumber,
            reviewsNumber: userDocument.reviewsNumber,
            ratingID: userDocument.ratingID,
        });

        this._id = userDocument._id.toString();
    }

}