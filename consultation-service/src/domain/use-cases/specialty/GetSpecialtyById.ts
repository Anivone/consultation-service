import { IUseCase, SpecialtyUseCaseProps } from "../types";
import { ISpecialtyRepository } from "../../gateway/ISpecialtyRepository";
import { ISpecialty } from "../../entities/types";

export class GetSpecialtyById implements IUseCase<ISpecialty> {

    specialtyRepository: ISpecialtyRepository;

    constructor({ specialtyRepository }: SpecialtyUseCaseProps) {
        this.specialtyRepository = specialtyRepository;
    }

    execute(props: string): Promise<ISpecialty> {
        return this.specialtyRepository.getSpecialtyById(props);
    }

}