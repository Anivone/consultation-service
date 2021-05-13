import { ISpecialty } from "../entities/types";

export interface ISpecialtyRepository {

    getSpecialties(filter?: any): Promise<ISpecialty[]>;

    getSpecialtyById(specialtyID: string): Promise<ISpecialty>;

    createSpecialty(specialtyProps: ISpecialty): Promise<ISpecialty>;

    updateSpecialty(specialtyID: string, updateProps: any): Promise<ISpecialty>;

    deleteSpecialty(specialtyID: string): Promise<ISpecialty>;

}