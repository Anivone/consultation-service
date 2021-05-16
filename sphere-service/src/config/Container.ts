import * as awilix from 'awilix';
import { SphereRepository } from "../data/repository/SphereRepository";
import * as mongoose from "mongoose";
import mongoModelsConfig from "./MongoConfig";
import { CreateSphere } from "../domain/use-cases/CreateSphere";
import { DeleteSphere } from "../domain/use-cases/DeleteSphere";
import { GetSphereById } from "../domain/use-cases/GetSphereById";
import { GetSpheres } from "../domain/use-cases/GetSpheres";
import { UpdateSphere } from "../domain/use-cases/UpdateSphere";
import { DeleteSpecialty } from "../domain/use-cases/DeleteSpecialty";
import { AddSpecialty } from "../domain/use-cases/AddSpecialty";
import { AddTag } from "../domain/use-cases/AddTag";
import { DeleteTag } from "../domain/use-cases/DeleteTag";

export interface ContainerReq extends Request {
    container: awilix.AwilixContainer;
}

export default function makeContainer(connection: mongoose.Connection) {
    const container = awilix.createContainer();
    const { sphereModel } = mongoModelsConfig(connection);

    container.register({

        //Other Values
        mongoConnection: awilix.asValue(connection),

        // Models
        SphereModel: awilix.asValue(sphereModel),

        // Repositories
        sphereRepository: awilix.asClass(SphereRepository).singleton(),

        // Use-Cases
        createSphere: awilix.asClass(CreateSphere).singleton(),
        deleteSphere: awilix.asClass(DeleteSphere).singleton(),
        getSphereById: awilix.asClass(GetSphereById).singleton(),
        getSpheres: awilix.asClass(GetSpheres).singleton(),
        updateSphere: awilix.asClass(UpdateSphere).singleton(),
        addSpecialty: awilix.asClass(AddSpecialty).singleton(),
        deleteSpecialty: awilix.asClass(DeleteSpecialty).singleton(),
        addTag: awilix.asClass(AddTag).singleton(),
        deleteTag: awilix.asClass(DeleteTag).singleton(),
    })

    return container;
};