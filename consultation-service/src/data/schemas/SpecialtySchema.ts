import { Schema, Model, Document } from 'mongoose';
import { ISpecialty } from "../../domain/entities/types";
import { Specialty } from "../../domain/entities/Specialty";

export interface ISpecialtyDocument extends Omit<ISpecialty, '_id'>, Document {
}

export interface ISpecialtyModel extends ISpecialty, Model<ISpecialtyDocument> {
    toSpecialty(specialty: ISpecialty): Specialty;
}

const SpecialtySchema: Schema<ISpecialtyDocument> = new Schema<ISpecialtyDocument>({
    name: {
        type: Schema.Types.String,
        unique: true,
        required: true
    }
});

SpecialtySchema.statics.toSpecialty = (specialty: ISpecialty) => {
    return new Specialty({
        _id: specialty._id.toString(),
        name: specialty.name,
    });
}

export default SpecialtySchema;