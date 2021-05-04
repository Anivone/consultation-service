import { ISpecialtyRepository } from "../../domain/gateway/ISpecialtyRepository";
import { ISpecialty } from "../../domain/entities/types";
import { ISpecialtyDocument, ISpecialtyModel } from "../schemas/SpecialtySchema";
import to from "await-to-js";
import SpecialtyDTO from "../../infrastructure/dto/SpecialtyDTO";

interface SpecialtyRepositoryProps {
    SpecialtyModel: ISpecialtyModel;
}

export class SpecialtyRepository implements ISpecialtyRepository {

    SpecialtyModel: ISpecialtyModel;

    constructor({ SpecialtyModel } : SpecialtyRepositoryProps) {
        this.SpecialtyModel = SpecialtyModel;
    }

    async createSpecialty(specialtyProps: ISpecialty): Promise<SpecialtyDTO> {
        const [err, specialty] = await to<ISpecialtyDocument>(new this.SpecialtyModel({
            sphereID: specialtyProps.sphereID,
            name: specialtyProps.name,
            consultationsNumber: specialtyProps.consultationsNumber,
            postsNumber: specialtyProps.postsNumber
        }).save());

        if (err) throw err;

        return new SpecialtyDTO(specialty);
    }

    async deleteSpecialty(specialtyID: string): Promise<SpecialtyDTO> {
        return new SpecialtyDTO(await this.SpecialtyModel.findByIdAndRemove(specialtyID));
    }

    async getSpecialtyById(specialtyID: string): Promise<SpecialtyDTO> {
        return new SpecialtyDTO(await this.SpecialtyModel.findById(specialtyID));

    }

    async getSpecialties(filter?: any): Promise<SpecialtyDTO[]> {
        const specialties = await this.SpecialtyModel.find(filter);
        return specialties.map(specialty => specialty ? new SpecialtyDTO(specialty) : null);
    }

    async updateSpecialty(specialtyID: string, updateProps: any): Promise<SpecialtyDTO> {
        const specialty = await this.SpecialtyModel.findByIdAndUpdate(specialtyID, updateProps);
        return new SpecialtyDTO(specialty);
    }

}