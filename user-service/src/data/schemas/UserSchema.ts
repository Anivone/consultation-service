import { Document, Model, Schema } from 'mongoose';
import { IUser } from "../../domain/entities/types";

export interface IUserDocument extends Omit<IUser, '_id'>, Document {
}

export interface IUserModel extends IUser, Model<IUserDocument> {
}

const UserSchema: Schema<IUserDocument> = new Schema<IUserDocument>({
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
    location: {
        country: {
            type: Schema.Types.String,
            required: true,
        },
        city: {
            type: Schema.Types.String,
            required: true,
        },
    },
    description: {
        type: Schema.Types.String,
        required: true,
    },
    posts: {
        type: Schema.Types.Number,
        required: true,
    },
    comments: {
        type: Schema.Types.Number,
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

export default UserSchema;