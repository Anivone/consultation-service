import { ISphereRepository } from "../gateway/ISphereRepository";
import { Sphere } from "../entities/Sphere";
import { IUseCase, SphereUseCaseProps } from "./types";
import { ISphere } from "../entities/types";
import SphereDTO from "../../infrastructure/dto/SphereDTO";

export class CreateSphere implements IUseCase<Sphere> {

    sphereRepository: ISphereRepository;

    constructor({ sphereRepository }: SphereUseCaseProps) {
        this.sphereRepository = sphereRepository;
    }

    execute(props: ISphere): Promise<ISphere> {
        const sphere = new Sphere(props);

        return this.sphereRepository.createSphere(sphere);
    }

}