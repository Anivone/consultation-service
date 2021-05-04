import { ISphereRepository } from "../../domain/gateway/ISphereRepository";
import { ISphere } from "../../domain/entities/types";
import { ISphereDocument, ISphereModel } from "../schemas/SphereSchema";
import to from "await-to-js";
import SphereDTO from "../../infrastructure/dto/SphereDTO";
import { Schema, Types } from "mongoose";

interface SphereRepositoryProps {
    SphereModel: ISphereModel;
}

export class SphereRepository implements ISphereRepository {

    SphereModel: ISphereModel;

    constructor({ SphereModel } : SphereRepositoryProps) {
        this.SphereModel = SphereModel;
    }

    async createSphere(sphereProps: ISphere): Promise<SphereDTO> {
        const [err, sphere] = await to<ISphereDocument>(new this.SphereModel({
            name: sphereProps.name
        }).save());

        if (err) throw new Error(err.message);

        return new SphereDTO(sphere);
    }

    async deleteSphere(sphereID: string): Promise<SphereDTO> {
        return new SphereDTO(await this.SphereModel.findByIdAndRemove(sphereID));
    }

    async getSphereById(sphereID: string): Promise<SphereDTO> {
        return new SphereDTO(await this.SphereModel.findById(sphereID));
    }

    async getSpheres(filter?: any): Promise<SphereDTO[]> {
        const spheres = await this.SphereModel.find(filter);

        return spheres.map((sphere: ISphereDocument) => sphere ? new SphereDTO(sphere) : null);
    }

    async updateSphere(sphereID: string, updateProps: any): Promise<SphereDTO> {
        return new SphereDTO(await this.SphereModel.findByIdAndUpdate(sphereID, updateProps));
    }

}