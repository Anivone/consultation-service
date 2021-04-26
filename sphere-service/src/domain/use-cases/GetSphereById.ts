import { IUseCase, UseCaseProps } from "./types";
import { Sphere } from "../entities/Sphere";
import { ISphereRepository } from "../gateway/ISphereRepository";

export class GetSphereById implements IUseCase<Sphere> {

    sphereRepository: ISphereRepository;

    constructor({ sphereRepository }: UseCaseProps) {
        this.sphereRepository = sphereRepository;
    }

    execute(props: string): Promise<Sphere> {
        return this.sphereRepository.getSphereById(props);
    }

}