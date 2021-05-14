import { IConsultUserRepository } from "../../domain/gateway/IConsultUserRepository";
import { IConsultUser } from "../../domain/entities/types";
import { IConsultUserModel } from "../schemas/ConsultUserSchema";
import to from "await-to-js";

interface ConsultUserRepositoryProps {
    ConsultUserModel: IConsultUserModel;
}

export class ConsultUserRepository implements IConsultUserRepository {

    ConsultUserModel: IConsultUserModel;

    constructor({ ConsultUserModel } : ConsultUserRepositoryProps) {
        this.ConsultUserModel = ConsultUserModel;
    }

    async createConsultUser(userProps: IConsultUser): Promise<IConsultUser> {
        const [err, user] = await to<IConsultUser>(new this.ConsultUserModel({
            userID: userProps.userID,
            firstName: userProps.firstName,
            lastName: userProps.lastName,
            middleName: userProps.middleName,
            phoneNumber: userProps.phoneNumber,
            isConsultant: userProps.isConsultant,
            specialtyID: userProps.specialtyID,
            consultationsNumber: userProps.consultationsNumber,
            ratingID: userProps.ratingID,
        }).save());

        if (err) throw err;

        return this.ConsultUserModel.toConsultUser(user);
    }

    async deleteConsultUser(userID: string): Promise<IConsultUser> {
        return this.ConsultUserModel.toConsultUser(await this.ConsultUserModel.findByIdAndRemove(userID));
    }

    async getConsultUserById(userID: string): Promise<IConsultUser> {
        return this.ConsultUserModel.toConsultUser(await this.ConsultUserModel.findById(userID));
    }

    async getConsultUsers(filter?: any): Promise<IConsultUser[]> {
        const users = await this.ConsultUserModel.find(filter);
        return users.map(user => this.ConsultUserModel.toConsultUser(user));
    }

    async updateConsultUser(userID: string, updateProps: any): Promise<IConsultUser> {
        return this.ConsultUserModel.toConsultUser(await this.ConsultUserModel.findByIdAndUpdate(userID, updateProps));
    }

}