import { ISphereRepository } from "../gateway/ISphereRepository";
import { Sphere } from "../entities/Sphere";
import { IUseCase, UseCaseProps } from "./types";
import { ISphere } from "../entities/types";

export class CreateSphere implements IUseCase<Sphere> {

    sphereRepository: ISphereRepository;

    constructor({ sphereRepository }: UseCaseProps) {
        this.sphereRepository = sphereRepository;
    }

    execute(props: ISphere): Promise<Sphere> {
        const sphere = new Sphere(props);

        return this.sphereRepository.createSphere(sphere);
    }

}