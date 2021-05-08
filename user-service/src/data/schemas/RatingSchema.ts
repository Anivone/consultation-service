import { Document, Model, Schema } from 'mongoose';
import { IRating } from "../../domain/entities/types";

export interface IRatingDocument extends Omit<IRating, '_id'>, Document {
}

export interface IRatingModel extends IRating, Model<IRatingDocument> {
}

const RatingSchema: Schema<IRatingDocument> = new Schema<IRatingDocument>({
    one: {
        type: Schema.Types.Number,
        required: true,
        default: 0
    },
    two: {
        type: Schema.Types.Number,
        required: true,
        default: 0
    },
    three: {
        type: Schema.Types.Number,
        required: true,
        default: 0
    },
    four: {
        type: Schema.Types.Number,
        required: true,
        default: 0
    },
    five: {
        type: Schema.Types.Number,
        required: true,
        default: 0
    },
});

export default RatingSchema;