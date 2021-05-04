import * as awilix from 'awilix';
import { SphereRepository } from "../data/repository/SphereRepository";
import * as mongoose from "mongoose";
import mongoModelsConfig from "./MongoConfig";
import { CreateSphere } from "../domain/use-cases/CreateSphere";
import { DeleteSphere } from "../domain/use-cases/DeleteSphere";
import { GetSphereById } from "../domain/use-cases/GetSphereById";
import { GetSpheres } from "../domain/use-cases/GetSpheres";
import { UpdateSphere } from "../domain/use-cases/UpdateSphere";
import { CreateSpecialty } from "../domain/use-cases/CreateSpecialty";
import { DeleteSpecialty } from "../domain/use-cases/DeleteSpecialty";
import { GetSpecialtyById } from "../domain/use-cases/GetSpecialtyById";
import { GetSpecialties } from "../domain/use-cases/GetSpecialties";
import { ChangeConsultationsNumber } from "../domain/use-cases/ChangeConsultationsNumber";
import { ChangePostsNumber } from "../domain/use-cases/ChangePostsNumber";
import { SpecialtyRepository } from "../data/repository/SpecialtyRepository";

export interface ContainerReq extends Request {
    container: awilix.AwilixContainer;
}

export default function makeContainer(connection: mongoose.Connection) {
    const container = awilix.createContainer();
    const { sphereModel, specialtyModel } = mongoModelsConfig(connection);

    container.register({

        //Other Values
        mongoConnection: awilix.asValue(connection),

        // Models
        SphereModel: awilix.asValue(sphereModel),
        SpecialtyModel: awilix.asValue(specialtyModel),

        // Repositories
        sphereRepository: awilix.asClass(SphereRepository).singleton(),
        specialtyRepository: awilix.asClass(SpecialtyRepository).singleton(),

        // Use-Cases
        createSphere: awilix.asClass(CreateSphere).singleton(),
        deleteSphere: awilix.asClass(DeleteSphere).singleton(),
        getSphereById: awilix.asClass(GetSphereById).singleton(),
        getSpheres: awilix.asClass(GetSpheres).singleton(),
        updateSphere: awilix.asClass(UpdateSphere).singleton(),

        createSpecialty: awilix.asClass(CreateSpecialty).singleton(),
        deleteSpecialty: awilix.asClass(DeleteSpecialty).singleton(),
        getSpecialtyByID: awilix.asClass(GetSpecialtyById).singleton(),
        getSpecialties: awilix.asClass(GetSpecialties).singleton(),
        changeConsultationsNumber: awilix.asClass(ChangeConsultationsNumber).singleton(),
        changePostsNumber: awilix.asClass(ChangePostsNumber).singleton(),

    })

    return container;
};