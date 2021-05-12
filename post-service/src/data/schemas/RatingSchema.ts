import { Document, Model, Schema } from 'mongoose';
import { IRating } from "../../domain/entities/types";
import { Rating } from "../../domain/entities/Rating";

export interface IRatingDocument extends Omit<IRating, '_id'>, Document {
}

export interface IRatingModel extends IRating, Model<IRatingDocument> {
    toRating(rating: IRating): Rating;
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

RatingSchema.statics.toRating = (rating: IRating) => {
    return new Rating({
        _id: rating._id.toString(),
        one: rating.one,
        two: rating.two,
        three: rating.three,
        four: rating.four,
        five: rating.five,
    })
}

export default RatingSchema;