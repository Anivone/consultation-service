import { IUseCase, SphereUseCaseProps } from "./types";
import { ISphereRepository } from "../gateway/ISphereRepository";
import { ISphere } from "../entities/types";

export class DeleteSphere implements IUseCase<ISphere> {

    sphereRepository: ISphereRepository;

    constructor({ sphereRepository }: SphereUseCaseProps) {
        this.sphereRepository = sphereRepository;
    }

    execute(props: string): Promise<ISphere> {
        return this.sphereRepository.deleteSphere(props);
    }

}