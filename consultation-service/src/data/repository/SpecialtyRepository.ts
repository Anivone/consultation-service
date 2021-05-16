import { ISpecialtyRepository } from "../../domain/gateway/ISpecialtyRepository";
import { ISpecialty } from "../../domain/entities/types";
import { ISpecialtyModel } from "../schemas/SpecialtySchema";
import to from "await-to-js";
import { Specialty } from "../../domain/entities/Specialty";

interface SpecialtyRepositoryProps {
    SpecialtyModel: ISpecialtyModel;
}

export class SpecialtyRepository implements ISpecialtyRepository {

    SpecialtyModel: ISpecialtyModel;

    constructor({ SpecialtyModel }: SpecialtyRepositoryProps) {
        this.SpecialtyModel = SpecialtyModel;
    }

    async createSpecialty(sphereProps: ISpecialty): Promise<Specialty> {
        const [err, sphere] = await to<ISpecialty>(new this.SpecialtyModel({
            name: sphereProps.name,
        }).save());

        if (err) throw err;

        return this.SpecialtyModel.toSpecialty(sphere);
    }

    async deleteSpecialty(sphereID: string): Promise<Specialty> {
        return this.SpecialtyModel.toSpecialty(await this.SpecialtyModel.findByIdAndRemove(sphereID));
    }

    async getSpecialtyById(sphereID: string): Promise<Specialty> {
        return this.SpecialtyModel.toSpecialty(await this.SpecialtyModel.findById(sphereID));
    }

    async getSpecialties(filter?: any): Promise<Specialty[]> {
        const spheres: ISpecialty[] = await this.SpecialtyModel.find(filter);
        return spheres.map(sphere => this.SpecialtyModel.toSpecialty(sphere));
    }

    async updateSpecialty(sphereID: string, updateProps: any): Promise<Specialty> {
        return this.SpecialtyModel.toSpecialty(
            await this.SpecialtyModel.findByIdAndUpdate(sphereID, updateProps));
    }

}