import { IUseCase, SpecialtyUseCaseProps } from "./types";
import { Specialty } from "../entities/Specialty";
import { ISpecialtyRepository } from "../gateway/ISpecialtyRepository";
import { ISpecialty } from "../entities/types";

export class GetSpecialties implements IUseCase<Specialty> {

    specialtyRepository: ISpecialtyRepository;

    constructor({ specialtyRepository }: SpecialtyUseCaseProps) {
        this.specialtyRepository = specialtyRepository;
    }

    execute(props: any): Promise<ISpecialty[]> {
        return this.specialtyRepository.getSpecialties(props);
    }

}