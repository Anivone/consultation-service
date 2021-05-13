import { ISpecialtyRepository } from "../../gateway/ISpecialtyRepository";
import { IUseCase, SpecialtyUseCaseProps } from "../types";
import { ISpecialty } from "../../entities/types";

export class CreateSpecialty implements IUseCase<ISpecialty> {

    specialtyRepository: ISpecialtyRepository;

    constructor({ specialtyRepository }: SpecialtyUseCaseProps) {
        this.specialtyRepository = specialtyRepository;
    }

    execute(props: ISpecialty): Promise<ISpecialty> {
        return this.specialtyRepository.createSpecialty(props);
    }

}