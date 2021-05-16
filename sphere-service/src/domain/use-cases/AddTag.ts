import { IUseCase, SphereUseCaseProps } from "./types";
import { ISphereRepository } from "../gateway/ISphereRepository";
import { ISpecialty, ISphere } from "../entities/types";

interface UpdateSphereProps {
    id: string,
    tagName: string,
}

export class AddTag implements IUseCase<ISphere> {

    sphereRepository: ISphereRepository;

    constructor({ sphereRepository }: SphereUseCaseProps) {
        this.sphereRepository = sphereRepository;
    }

    execute({ id, tagName }: UpdateSphereProps): Promise<ISphere> {
        return this.sphereRepository.updateSphere(id,
            {
                $push: { tags: tagName }
            });
    }

}