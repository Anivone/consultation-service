import { IConsultUser } from "../entities/types";

export interface IConsultUserRepository {

    getConsultUsers(filter?: any): Promise<IConsultUser[]>;

    getConsultUserById(userID: string): Promise<IConsultUser>;

    createConsultUser(userProps: IConsultUser): Promise<IConsultUser>;

    updateConsultUser(userID: string, updateProps: any): Promise<IConsultUser>;

    deleteConsultUser(userID: string): Promise<IConsultUser>;
    
}