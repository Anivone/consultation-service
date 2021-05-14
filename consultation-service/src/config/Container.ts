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

import { CreateConsultUser } from "../domain/use-cases/user/CreateConsultUser";
import { UpdateConsultUser } from "../domain/use-cases/user/UpdateConsultUser";
import { GetConsultUserById } from "../domain/use-cases/user/GetConsultUserById";
import { GetConsultUsers } from "../domain/use-cases/user/GetConsultUsers";
import { DeleteConsultUser } from "../domain/use-cases/user/DeleteConsultUser";

import { ConsultUserRepository } from "../data/repository/ConsultUserRepository";
import { RatingRepository } from "../data/repository/RatingRepository";

import { DeleteRating } from "../domain/use-cases/rating/DeleteRating";
import { UpdateRating } from "../domain/use-cases/rating/UpdateRating";
import { CreateRating } from "../domain/use-cases/rating/CreateRating";
import { GetRatingById } from "../domain/use-cases/rating/GetRatingById";
import { GetRatings } from "../domain/use-cases/rating/GetRatings";

export interface ContainerReq extends Request {
    container: awilix.AwilixContainer;
}

export default function makeContainer(connection: mongoose.Connection) {
    const container = awilix.createContainer();
    const { consultationModel, specialtyModel, consultUserModel, ratingModel } = mongoModelsConfig(connection);

    container.register({

        //Other Values
        mongoConnection: awilix.asValue(connection),

        // Models
        ConsultationModel: awilix.asValue(consultationModel),
        SpecialtyModel: awilix.asValue(specialtyModel),
        ConsultUserModel: awilix.asValue(consultUserModel),
        RatingModel: awilix.asValue(ratingModel),


        // Repositories
        consultationRepository: awilix.asClass(ConsultationRepository).singleton(),
        specialtyRepository: awilix.asClass(SpecialtyRepository).singleton(),
        consultUserRepository: awilix.asClass(ConsultUserRepository).singleton(),
        ratingRepository: awilix.asClass(RatingRepository).singleton(),

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

        createConsultUser: awilix.asClass(CreateConsultUser).singleton(),
        deleteConsultUser: awilix.asClass(DeleteConsultUser).singleton(),
        getConsultUserById: awilix.asClass(GetConsultUserById).singleton(),
        getConsultUsers: awilix.asClass(GetConsultUsers).singleton(),
        updateConsultUser: awilix.asClass(UpdateConsultUser).singleton(),

        createRating: awilix.asClass(CreateRating).singleton(),
        deleteRating: awilix.asClass(DeleteRating).singleton(),
        getRatingById: awilix.asClass(GetRatingById).singleton(),
        getRatings: awilix.asClass(GetRatings).singleton(),
        updateRating: awilix.asClass(UpdateRating).singleton(),

    })

    return container;
};