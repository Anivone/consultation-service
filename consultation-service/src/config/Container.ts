import * as awilix from 'awilix';
import * as mongoose from "mongoose";
import mongoModelsConfig from "./MongoConfig";

import { ConsultationRepository } from "../data/repository/ConsultationRepository";
import { SpecialtyRepository } from "../data/repository/SpecialtyRepository";

import { CreateConsultation } from "../domain/use-cases/consultation/CreateConsultation";
import { DeleteConsultation } from "../domain/use-cases/consultation/DeleteConsultation";
import { GetConsultationById } from "../domain/use-cases/consultation/GetConsultationById";
import { GetConsultations } from "../domain/use-cases/consultation/GetConsultations";
import { UpdateConsultation } from "../domain/use-cases/consultation/UpdateConsultation";

import { GetSpecialties } from "../domain/use-cases/specialty/GetSpecialties";
import { GetSpecialtyById } from "../domain/use-cases/specialty/GetSpecialtyById";
import { CreateSpecialty } from "../domain/use-cases/specialty/CreateSpecialty";
import { UpdateSpecialty } from "../domain/use-cases/specialty/UpdateSphere";
import { DeleteSpecialty } from "../domain/use-cases/specialty/DeleteSpecialty";

export interface ContainerReq extends Request {
    container: awilix.AwilixContainer;
}

export default function makeContainer(connection: mongoose.Connection) {
    const container = awilix.createContainer();
    const { consultationModel, specialtyModel } = mongoModelsConfig(connection);

    container.register({

        //Other Values
        mongoConnection: awilix.asValue(connection),

        // Models
        ConsultationModel: awilix.asValue(consultationModel),
        SpecialtyModel: awilix.asValue(specialtyModel),

        // Repositories
        consultationRepository: awilix.asClass(ConsultationRepository).singleton(),
        specialtyRepository: awilix.asClass(SpecialtyRepository).singleton(),

        // Use-Cases
        createConsultation: awilix.asClass(CreateConsultation).singleton(),
        deleteConsultation: awilix.asClass(DeleteConsultation).singleton(),
        getConsultationById: awilix.asClass(GetConsultationById).singleton(),
        getConsultations: awilix.asClass(GetConsultations).singleton(),
        updateConsultation: awilix.asClass(UpdateConsultation).singleton(),

        createSpecialty: awilix.asClass(CreateSpecialty).singleton(),
        deleteSpecialty: awilix.asClass(DeleteSpecialty).singleton(),
        getSpecialtyById: awilix.asClass(GetSpecialtyById).singleton(),
        getSpecialties: awilix.asClass(GetSpecialties).singleton(),
        updateSpecialty: awilix.asClass(UpdateSpecialty).singleton(),

    })

    return container;
};