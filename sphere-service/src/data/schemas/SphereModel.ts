import { Schema, Model, Document } from 'mongoose';
import { ISphere } from "../../domain/entities/types";

export interface ISphereDocument extends ISphere, Document {
}

export interface ISphereModel extends ISphere, Model<ISphereDocument> {
}

const SphereModel: Schema<ISphereDocument> = new Schema<ISphereDocument>({
    name: {
        type: Schema.Types.String,
        required: true
    },
    specialties: [{
        name: {
            type: Schema.Types.String,
            required: true,
        },
        consultationsNumber: {
            type: Schema.Types.Number,
            required: true,
        },
        postsNumber: {
            type: Schema.Types.Number,
            required: true,
        }
    }]
})

export default SphereModel;