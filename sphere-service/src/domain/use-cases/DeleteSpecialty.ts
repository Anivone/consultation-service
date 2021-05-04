import { IUseCase, SpecialtyUseCaseProps } from "./types";
import { Specialty } from "../entities/Specialty";
import { ISpecialtyRepository } from "../gateway/ISpecialtyRepository";
import { ISpecialty } from "../entities/types";

export class DeleteSpecialty implements IUseCase<Specialty> {

    specialtyRepository: ISpecialtyRepository;

    constructor({ specialtyRepository }: SpecialtyUseCaseProps) {
        this.specialtyRepository = specialtyRepository;
    }

    execute(props: string): Promise<ISpecialty> {
        return this.specialtyRepository.deleteSpecialty(props);
    }

}