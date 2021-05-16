import { Schema, Model, Document } from 'mongoose';
import { IUserTags } from "../../domain/entities/types";
import { UserTags } from "../../domain/entities/UserTags";

export interface IUserTagsDocument extends Omit<IUserTags, '_id'>, Document {
}

export interface IUserTagsModel extends IUserTags, Model<IUserTagsDocument> {
    toUserTags(userTag: IUserTags): UserTags;
}

const UserTagsSchema: Schema<IUserTagsDocument> = new Schema<IUserTagsDocument>({
    userID: {
        type: Schema.Types.String,
        required: true,
    },
    tags: [{
        type: Schema.Types.String,
        required: true
    }]
})

UserTagsSchema.statics.toUserTags = (userTag: IUserTags) => {
    return new UserTags({
        _id: userTag._id.toString(),
        userID: userTag.userID,
        tags: userTag.tags
    });
}

export default UserTagsSchema;