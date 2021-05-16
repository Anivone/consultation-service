import { IUseCase, SphereUseCaseProps } from "./types";
import { ISphereRepository } from "../gateway/ISphereRepository";
import { ISphere } from "../entities/types";

export class GetSpheres implements IUseCase<ISphere> {

    sphereRepository: ISphereRepository;

    constructor({ sphereRepository }: SphereUseCaseProps) {
        this.sphereRepository = sphereRepository;
    }

    execute(props: any): Promise<ISphere[]> {
        return this.sphereRepository.getSpheres(props);
    }

}