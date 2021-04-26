import { IConsultationRepository } from "../gateway/IConsultationRepository";

export interface IUseCase<T> {

    execute(props: any): Promise<T> | Promise<T[]>;

}

export interface UseCaseProps {

    consultationRepository: IConsultationRepository;

}