import { Schema, Model, Document } from 'mongoose';
import { ISphere } from "../../domain/entities/types";

export interface ISphereDocument extends ISphere, Document {
}

export interface ISphereModel extends ISphere, Model<ISphereDocument> {
}

const SphereSchema: Schema<ISphereDocument> = new Schema<ISphereDocument>({
    name: {
        type: Schema.Types.String,
        required: true
    }
})

export default SphereSchema;