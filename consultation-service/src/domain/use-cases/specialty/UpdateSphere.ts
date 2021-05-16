import { IUseCase, SpecialtyUseCaseProps } from "../types";
import { ISpecialtyRepository } from "../../gateway/ISpecialtyRepository";
import { ISpecialty } from "../../entities/types";

interface UpdateUseCase {
    id: string,
    updateProps: any,
}

export class UpdateSpecialty implements IUseCase<ISpecialty> {

    specialtyRepository: ISpecialtyRepository;

    constructor({ specialtyRepository }: SpecialtyUseCaseProps) {
        this.specialtyRepository = specialtyRepository;
    }

    execute({ id, updateProps }: UpdateUseCase): Promise<ISpecialty> {
        return this.specialtyRepository.updateSpecialty(id, updateProps);
    }

}