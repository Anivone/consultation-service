import { IUseCase, SphereUseCaseProps } from "./types";
import { Sphere } from "../entities/Sphere";
import { ISphereRepository } from "../gateway/ISphereRepository";
import { ISphere } from "../entities/types";
import SphereDTO from "../../infrastructure/dto/SphereDTO";

interface UpdateUseCase {
    id: string,
    updateProps: any,
}

export class UpdateSphere implements IUseCase<Sphere> {

    sphereRepository: ISphereRepository;

    constructor({ sphereRepository }: SphereUseCaseProps) {
        this.sphereRepository = sphereRepository;
    }

    execute({ id, updateProps }: UpdateUseCase): Promise<ISphere> {
        return this.sphereRepository.updateSphere(id, updateProps);
    }

}