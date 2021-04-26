import { IUseCase, UseCaseProps } from "./types";
import { Sphere } from "../entities/Sphere";
import { ISphereRepository } from "../gateway/ISphereRepository";

export class GetSpheres implements IUseCase<Sphere> {

    sphereRepository: ISphereRepository;

    constructor({ sphereRepository }: UseCaseProps) {
        this.sphereRepository = sphereRepository;
    }

    execute(props: any): Promise<Sphere[]> {
        return this.sphereRepository.getSpheres(props);
    }

}