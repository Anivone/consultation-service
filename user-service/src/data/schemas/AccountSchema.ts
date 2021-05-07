import * as bcrypt from 'bcrypt';
import { Document, Model, Schema } from 'mongoose';
import { IAccount, Role } from "../../domain/entities/types";

export interface IAccountDocument extends Omit<IAccount, '_id'>, Document {
}

export interface IAccountModel extends IAccount, Model<IAccountDocument> {
}

const AccountSchema: Schema<IAccountDocument> = new Schema<IAccountDocument>({
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true,
    },
    password: {
        type: Schema.Types.String,
        required: true,
    },
    userID: {
        type: Schema.Types.String,
        required: true,
    },
    role: {
        type: Schema.Types.String,
        enum: Role,
        default: Role.User,
        required: true
    }
});

AccountSchema.pre<IAccountDocument>(
    'save',
    async function (next) {
        const user = this;
        user.password = await bcrypt.hash(user.password, 10);
        next();
    });

export default AccountSchema;