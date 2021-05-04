import { IUseCase, SpecialtyUseCaseProps } from "./types";
import { Specialty } from "../entities/Specialty";
import { ISpecialtyRepository } from "../gateway/ISpecialtyRepository";

interface ChangePostsProps {
    specialtyID: string;
    postsNumber: number;
}

export class ChangePostsNumber implements IUseCase<Specialty> {
    private specialtyRepository: ISpecialtyRepository;

    constructor({specialtyRepository}: SpecialtyUseCaseProps) {
        this.specialtyRepository = specialtyRepository;
    }

    async execute(props: ChangePostsProps): Promise<Specialty> {
        const specialty = await this.specialtyRepository.getSpecialtyById(props.specialtyID);
        const changeNumber = specialty.postsNumber + props.postsNumber;
        return this.specialtyRepository
            .updateSpecialty(props.specialtyID, {postsNumber: changeNumber});
    }

}