import { ISphereRepository } from "../gateway/ISphereRepository";
import { ISpecialtyRepository } from "../gateway/ISpecialtyRepository";

export interface IUseCase<T> {

    execute(props: any): Promise<T> | Promise<T[]>;

}

export interface SphereUseCaseProps {

    sphereRepository: ISphereRepository;

}

export interface SpecialtyUseCaseProps {

    specialtyRepository: ISpecialtyRepository;

}