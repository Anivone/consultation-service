import * as awilix from 'awilix';
import { ConsultationRepository } from "../data/repository/ConsultationRepository";
import * as mongoose from "mongoose";
import mongoModelsConfig from "./MongoConfig";
import { CreateConsultation } from "../domain/use-cases/CreateConsultation";
import { DeleteConsultation } from "../domain/use-cases/DeleteConsultation";
import { GetConsultationById } from "../domain/use-cases/GetConsultationById";
import { GetConsultations } from "../domain/use-cases/GetConsultations";
import { UpdateConsultation } from "../domain/use-cases/UpdateConsultation";

export interface ContainerReq extends Request {
    container: awilix.AwilixContainer;
}

export default function makeContainer(connection: mongoose.Connection) {
    const container = awilix.createContainer();
    const consultationModel = mongoModelsConfig(connection).consultationModel;

    container.register({

        //Other Values
        mongoConnection: awilix.asValue(connection),

        // Models
        ConsultationModel: awilix.asValue(consultationModel),

        // Repositories
        consultationRepository: awilix.asClass(ConsultationRepository).singleton(),

        // Use-Cases
        createConsultation: awilix.asClass(CreateConsultation).singleton(),
        deleteConsultation: awilix.asClass(DeleteConsultation).singleton(),
        getConsultationById: awilix.asClass(GetConsultationById).singleton(),
        getConsultations: awilix.asClass(GetConsultations).singleton(),
        updateConsultation: awilix.asClass(UpdateConsultation).singleton(),

    })

    return container;
};