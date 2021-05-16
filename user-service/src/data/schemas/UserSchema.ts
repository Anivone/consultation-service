import { Document, Model, Schema } from 'mongoose';
import { IUser } from "../../domain/entities/types";
import { User } from "../../domain/entities/User";

export interface IUserDocument extends Omit<IUser, '_id'>, Document {
}

export interface IUserModel extends IUser, Model<IUserDocument> {
    toUser(user: IUser): User;
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
UserSchema.statics.toUser = (user: IUser) => {
    return new User({
        _id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        middleName: user.middleName,
        phoneNumber: user.phoneNumber,
        location: {
            country: user.location.country,
            city: user.location.city,
        },
        description: user.description,
        posts: user.posts,
        comments: user.comments,
        isConsultant: user.isConsultant,
        specialtyID: user.specialtyID,
        consultationsNumber: user.consultationsNumber,
        ratingID: user.ratingID,
    })
};

export default UserSchema;