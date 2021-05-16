import { IConsultationRepository } from "../gateway/IConsultationRepository";
import { ISpecialtyRepository } from "../gateway/ISpecialtyRepository";
import { IConsultUserRepository } from "../gateway/IConsultUserRepository";
import { IRatingRepository } from "../../../../post-service/src/domain/gateway/IRatingRepository";

export interface IUseCase<T> {
    execute(props: any): Promise<T> | Promise<T[]>;
}

export interface ConsultationUseCaseProps {
    consultationRepository: IConsultationRepository;
}

export interface SpecialtyUseCaseProps {
    specialtyRepository: ISpecialtyRepository;
}

export interface ConsultUserUseCaseProps {
    consultUserRepository: IConsultUserRepository;
}

export interface RatingUseCaseProps {
    ratingRepository: IRatingRepository;
}