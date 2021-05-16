import { IUseCase, SphereUseCaseProps } from "./types";
import { ISphereRepository } from "../gateway/ISphereRepository";
import { ISphere } from "../entities/types";

interface UpdateUseCase {
    id: string,
    updateProps: any,
}

export class UpdateSphere implements IUseCase<ISphere> {

    sphereRepository: ISphereRepository;

    constructor({ sphereRepository }: SphereUseCaseProps) {
        this.sphereRepository = sphereRepository;
    }

    execute({ id, updateProps }: UpdateUseCase): Promise<ISphere> {
        return this.sphereRepository.updateSphere(id, updateProps);
    }

}