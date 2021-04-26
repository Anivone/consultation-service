import { IUseCase, UseCaseProps } from "./types";
import { Sphere } from "../entities/Sphere";
import { ISphereRepository } from "../gateway/ISphereRepository";
import { ISphere } from "../entities/types";

interface UpdateUseCase {
    id: string,
    updateProps: any,
}

export class UpdateSphere implements IUseCase<Sphere> {

    sphereRepository: ISphereRepository;

    constructor({ sphereRepository }: UseCaseProps) {
        this.sphereRepository = sphereRepository;
    }

    execute({ id, updateProps }: UpdateUseCase): Promise<Sphere> {
        return this.sphereRepository.updateSphere(id, updateProps);
    }

}