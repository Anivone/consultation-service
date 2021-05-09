import { Schema, Model, Document } from 'mongoose';
import { ISphere } from "../../domain/entities/types";
import { Sphere } from "../../domain/entities/Sphere";
import { Specialty } from "../../domain/entities/Specialty";

export interface ISphereDocument extends Omit<ISphere, '_id'>, Document {
}

export interface ISphereModel extends ISphere, Model<ISphereDocument> {
    toSphere(sphere: ISphere): Sphere;
}

const SphereSchema: Schema<ISphereDocument> = new Schema<ISphereDocument>({
    name: {
        type: Schema.Types.String,
        required: true
    },
    specialties: [{
        name: {
            type: Schema.Types.String,
            unique: true,
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
    }],
    tags: [{
        type: Schema.Types.String,
        unique: true,
        required: true
    }]
})

SphereSchema.statics.toSphere = (sphere: ISphere) => {
    return new Sphere({
        _id: sphere._id,
        name: sphere.name,
        specialties: sphere.specialties.map(specialty => new Specialty(specialty)),
        tags: sphere.tags
    });
}

export default SphereSchema;