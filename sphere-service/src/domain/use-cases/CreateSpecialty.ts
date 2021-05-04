import { IUseCase, SpecialtyUseCaseProps, SphereUseCaseProps } from "./types";
import { ISpecialty, ISphere } from "../entities/types";
import { Specialty } from "../entities/Specialty";
import { ISpecialtyRepository } from "../gateway/ISpecialtyRepository";
import { ISphereRepository } from "../gateway/ISphereRepository";
import to from "await-to-js";

interface CreateSpecialtyProps extends SpecialtyUseCaseProps {
    sphereRepository: ISphereRepository;
}

interface executeProps {
    sphereID: string;
    name: string;
    consultationsNumber?: number;
    postsNumber?: number;
}

export class CreateSpecialty implements IUseCase<Specialty> {

    private specialtyRepository: ISpecialtyRepository;
    private sphereRepository: ISphereRepository;

    constructor({specialtyRepository, sphereRepository}: CreateSpecialtyProps) {
        this.specialtyRepository = specialtyRepository;
        this.sphereRepository = sphereRepository;
    }

    async execute(props: executeProps): Promise<Specialty> {
        const [err, sphere] = await to<ISphere>(this.sphereRepository.getSphereById(props.sphereID));
        if (err) throw err;
        if (!sphere) throw new Error("The sphere with such _id does not exist");

        const [err2, specialty] = await to<ISpecialty>(
            this.specialtyRepository.createSpecialty(new Specialty({
                sphereID: props.sphereID,
                name: props.name,
                consultationsNumber: props.consultationsNumber,
                postsNumber: props.postsNumber
            })));
        if (err2) throw err2;

        return specialty;
    }

}