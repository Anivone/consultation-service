import { IUseCase, SphereUseCaseProps } from "./types";
import { Sphere } from "../entities/Sphere";
import { ISphereRepository } from "../gateway/ISphereRepository";
import SphereDTO from "../../infrastructure/dto/SphereDTO";
import { ISphere } from "../entities/types";

export class GetSpheres implements IUseCase<Sphere> {

    sphereRepository: ISphereRepository;

    constructor({ sphereRepository }: SphereUseCaseProps) {
        this.sphereRepository = sphereRepository;
    }

    execute(props: any): Promise<ISphere[]> {
        return this.sphereRepository.getSpheres(props);
    }

}