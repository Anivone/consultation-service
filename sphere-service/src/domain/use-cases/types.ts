import { ISphereRepository } from "../gateway/ISphereRepository";

export interface IUseCase<T> {

    execute(props: any): Promise<T> | Promise<T[]>;

}

export interface SphereUseCaseProps {
    sphereRepository: ISphereRepository;
}