import { ISphereRepository } from "../gateway/ISphereRepository";
import { IUseCase, SphereUseCaseProps } from "./types";
import { ISphere } from "../entities/types";

export class CreateSphere implements IUseCase<ISphere> {

    sphereRepository: ISphereRepository;

    constructor({ sphereRepository }: SphereUseCaseProps) {
        this.sphereRepository = sphereRepository;
    }

    execute(props: ISphere): Promise<ISphere> {
        return this.sphereRepository.createSphere(props);
    }

}