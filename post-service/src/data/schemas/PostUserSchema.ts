import { Document, Model, Schema } from 'mongoose';
import { IPostUser } from "../../domain/entities/types";
import { PostUser } from "../../domain/entities/PostUser";

export interface IPostUserDocument extends Omit<IPostUser, '_id'>, Document {
}

export interface IPostUserModel extends IPostUser, Model<IPostUserDocument> {
    toPostUser(postUser: IPostUser): PostUser;
}

const PostUserSchema: Schema<IPostUserDocument> = new Schema<IPostUserDocument>({
    firstName: {
        type: Schema.Types.String,
        required: true,
    },
    lastName: {
        type: Schema.Types.String,
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
    ratingID: {
        type: Schema.Types.String,
        required: false,
    },
});

PostUserSchema.statics.toPostUser = (postUser: IPostUser) => {
    return new PostUser({
        _id: postUser._id.toString(),
        firstName: postUser.firstName,
        lastName: postUser.lastName,
        isConsultant: postUser.isConsultant,
        specialtyID: postUser.specialtyID,
        ratingID: postUser.ratingID,
    })
}

export default PostUserSchema;