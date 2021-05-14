import { Document, Model, Schema } from 'mongoose';
import { IConsultUser } from "../../domain/entities/types";
import { ConsultUser } from "../../domain/entities/ConsultUser";

export interface IConsultUserDocument extends Omit<IConsultUser, '_id'>, Document {
}

export interface IConsultUserModel extends IConsultUser, Model<IConsultUserDocument> {
    toConsultUser(user: IConsultUser): ConsultUser;
}

const ConsultUserSchema: Schema<IConsultUserDocument> = new Schema<IConsultUserDocument>({
    userID: {
        type: Schema.Types.String,
        required: true,
    },
    firstName: {
        type: Schema.Types.String,
        required: true,
    },
    lastName: {
        type: Schema.Types.String,
        required: true,
    },
    middleName: {
        type: Schema.Types.String,
        required: false,
    },
    phoneNumber: {
        type: Schema.Types.String,
        unique: true,
        required: true,
    },
    isConsultant: {
        type: Schema.Types.Boolean,
        required: true,
    },
    specialtyID: {
        type: Schema.Types.String,
        required: false,
    },
    consultationsNumber: {
        type: Schema.Types.Number,
        required: false,
    },
    ratingID: {
        type: Schema.Types.String,
        required: false,
    },
});
ConsultUserSchema.statics.toConsultUser = (user: IConsultUser) => {
    return new ConsultUser({
        _id: user._id.toString(),
        userID: user.userID,
        firstName: user.firstName,
        lastName: user.lastName,
        middleName: user.middleName,
        phoneNumber: user.phoneNumber,
        isConsultant: user.isConsultant,
        specialtyID: user.specialtyID,
        consultationsNumber: user.consultationsNumber,
        ratingID: user.ratingID,
    })
};

export default ConsultUserSchema;