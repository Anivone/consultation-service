import { IUseCase, SphereUseCaseProps } from "./types";
import { ISphereRepository } from "../gateway/ISphereRepository";
import { ISpecialty, ISphere } from "../entities/types";

interface UpdateSphereProps {
    id: string,
    specialty: ISpecialty,
}

export class AddSpecialty implements IUseCase<ISphere> {

    sphereRepository: ISphereRepository;

    constructor({ sphereRepository }: SphereUseCaseProps) {
        this.sphereRepository = sphereRepository;
    }

    execute({ id, specialty }: UpdateSphereProps): Promise<ISphere> {
        return this.sphereRepository.updateSphere(id,
            {
                $push: { specialties: specialty }
            });
    }

}