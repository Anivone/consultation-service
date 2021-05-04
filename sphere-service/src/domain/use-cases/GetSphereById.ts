import { IUseCase, SphereUseCaseProps } from "./types";
import { Sphere } from "../entities/Sphere";
import { ISphereRepository } from "../gateway/ISphereRepository";
import { ISphere } from "../entities/types";

export class GetSphereById implements IUseCase<Sphere> {

    sphereRepository: ISphereRepository;

    constructor({ sphereRepository }: SphereUseCaseProps) {
        this.sphereRepository = sphereRepository;
    }

    execute(props: string): Promise<ISphere> {
        return this.sphereRepository.getSphereById(props);
    }

}