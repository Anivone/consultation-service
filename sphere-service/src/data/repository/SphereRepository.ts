import { ISphereRepository } from "../../domain/gateway/ISphereRepository";
import { ISphere } from "../../domain/entities/types";
import { ISphereDocument, ISphereModel } from "../schemas/SphereModel";
import to from "await-to-js";

interface SphereRepositoryProps {
    SphereModel: ISphereModel;
}

export class SphereRepository implements ISphereRepository {

    SphereModel: ISphereModel;

    constructor({ SphereModel } : SphereRepositoryProps) {
        this.SphereModel = SphereModel;
    }

    async createSphere(sphereProps: ISphere): Promise<ISphereDocument> {
        const [err, sphere] = await to<ISphereDocument>(new this.SphereModel({
            name: sphereProps.name,
            specialties: sphereProps.specialties
        }).save());

        if (err) throw new Error(err.message);

        return sphere;
    }

    async deleteSphere(sphereID: string): Promise<ISphereDocument> {
        return this.SphereModel.findByIdAndRemove(sphereID);
    }

    async getSphereById(sphereID: string): Promise<ISphereDocument> {
        return this.SphereModel.findById(sphereID);

    }

    async getSpheres(filter?: any): Promise<ISphereDocument[]> {
        return this.SphereModel.find(filter);
    }

    async updateSphere(sphereID: string, updateProps: any): Promise<ISphereDocument> {
        return this.SphereModel.findByIdAndUpdate(sphereID, updateProps);
    }

}