import { ISphere } from "../entities/types";
import SphereDTO from "../../infrastructure/dto/SphereDTO";

export interface ISphereRepository {

    getSpheres(filter?: any): Promise<ISphere[]>;

    getSphereById(sphereID: string): Promise<ISphere>;

    createSphere(sphereProps: ISphere): Promise<ISphere>;

    updateSphere(sphereID: string, updateProps: any): Promise<ISphere>;

    deleteSphere(sphereID: string): Promise<ISphere>;

}