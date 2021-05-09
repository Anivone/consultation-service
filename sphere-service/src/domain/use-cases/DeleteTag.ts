import { IUseCase, SphereUseCaseProps } from "./types";
import { ISphereRepository } from "../gateway/ISphereRepository";
import { ISphere } from "../entities/types";

interface UpdateUseCase {
    id: string,
    tagName: string,
}

export class DeleteTag implements IUseCase<ISphere> {

    sphereRepository: ISphereRepository;

    constructor({ sphereRepository }: SphereUseCaseProps) {
        this.sphereRepository = sphereRepository;
    }

    execute({ id, tagName }: UpdateUseCase): Promise<ISphere> {
        return this.sphereRepository.updateSphere(id,
            {
                $pull: {
                    tags: tagName
                }
            });
    }

}