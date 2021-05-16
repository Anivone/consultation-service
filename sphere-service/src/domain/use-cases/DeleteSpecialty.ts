import { IUseCase, SphereUseCaseProps } from "./types";
import { ISphereRepository } from "../gateway/ISphereRepository";
import { ISphere } from "../entities/types";

interface UpdateUseCase {
    id: string,
    specialtyID: string,
}

export class DeleteSpecialty implements IUseCase<ISphere> {

    sphereRepository: ISphereRepository;

    constructor({ sphereRepository }: SphereUseCaseProps) {
        this.sphereRepository = sphereRepository;
    }

    execute({ id, specialtyID }: UpdateUseCase): Promise<ISphere> {
        return this.sphereRepository.updateSphere(id,
            {
                $pull: {
                    specialties: {
                        _id: specialtyID
                    }
                }
            });
    }

}