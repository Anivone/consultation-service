import { ISphere } from "../entities/types";
import { Sphere } from "../entities/Sphere";

export interface ISphereRepository {

    getSpheres(filter?: any): Promise<Sphere[]>;

    getSphereById(sphereID: string): Promise<Sphere>;

    createSphere(sphereProps: ISphere): Promise<Sphere>;

    updateSphere(sphereID: string, updateProps: any): Promise<Sphere>;

    deleteSphere(sphereID: string): Promise<Sphere>;

}