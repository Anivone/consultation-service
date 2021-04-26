import { ISphereRepository } from "../gateway/ISphereRepository";

export interface IUseCase<T> {

    execute(props: any): Promise<T> | Promise<T[]>;

}

export interface UseCaseProps {

    sphereRepository: ISphereRepository;

}