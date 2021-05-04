import { IUseCase, SpecialtyUseCaseProps } from "./types";
import { Specialty } from "../entities/Specialty";
import { ISpecialtyRepository } from "../gateway/ISpecialtyRepository";

interface ChangeConsultationsProps {
    specialtyID: string;
    consultationsNumber: number;
}

export class ChangeConsultationsNumber implements IUseCase<Specialty> {
    private specialtyRepository: ISpecialtyRepository;

    constructor({specialtyRepository}: SpecialtyUseCaseProps) {
        this.specialtyRepository = specialtyRepository;
    }

    async execute(props: ChangeConsultationsProps): Promise<Specialty> {
        const specialty = await this.specialtyRepository.getSpecialtyById(props.specialtyID);
        const changeNumber = specialty.consultationsNumber + props.consultationsNumber;
        return this.specialtyRepository
            .updateSpecialty(props.specialtyID, {consultationsNumber: changeNumber});
    }

}