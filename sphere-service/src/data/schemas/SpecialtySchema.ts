import { Schema, Model, Document } from 'mongoose';
import { ISpecialty } from "../../domain/entities/types";

export interface ISpecialtyDocument extends ISpecialty, Document {
}

export interface ISpecialtyModel extends ISpecialty, Model<ISpecialtyDocument> {
}

const SpecialtySchema: Schema<ISpecialtyDocument> = new Schema<ISpecialtyDocument>({
    sphereID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Sphere'
    },
    name: {
        type: Schema.Types.String,
        required: true
    },
    consultationsNumber: {
        type: Schema.Types.Number,
        default: 0,
        required: true
    },
    postsNumber: {
        type: Schema.Types.Number,
        default: 0,
        required: true
    }
})

export default SpecialtySchema;