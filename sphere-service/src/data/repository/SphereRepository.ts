import { ISphereRepository } from "../../domain/gateway/ISphereRepository";
import { ISphere } from "../../domain/entities/types";
import { ISphereModel } from "../schemas/SphereSchema";
import to from "await-to-js";
import { Sphere } from "../../domain/entities/Sphere";
import { Specialty } from "../../domain/entities/Specialty";

interface SphereRepositoryProps {
    SphereModel: ISphereModel;
}

export class SphereRepository implements ISphereRepository {

    SphereModel: ISphereModel;

    constructor({ SphereModel }: SphereRepositoryProps) {
        this.SphereModel = SphereModel;
    }

    async createSphere(sphereProps: ISphere): Promise<Sphere> {
        const [err, sphere] = await to<ISphere>(new this.SphereModel({
            name: sphereProps.name,
            specialties: sphereProps.specialties,
            tags: sphereProps.tags,
        }).save());

        if (err) throw err;

        return this.SphereModel.toSphere(sphere);
    }

    async deleteSphere(sphereID: string): Promise<Sphere> {
        return this.SphereModel.toSphere(await this.SphereModel.findByIdAndRemove(sphereID));
    }

    async getSphereById(sphereID: string): Promise<Sphere> {
        return this.SphereModel.toSphere(await this.SphereModel.findById(sphereID));
    }

    async getSpheres(filter?: any): Promise<Sphere[]> {
        const spheres: ISphere[] = await this.SphereModel.find(filter);

        return spheres.map(sphere => this.SphereModel.toSphere(sphere));
    }

    async updateSphere(sphereID: string, updateProps: any): Promise<Sphere> {
        return this.SphereModel.toSphere(
            await this.SphereModel.findByIdAndUpdate(sphereID, updateProps));
    }

}