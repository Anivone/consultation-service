import * as awilix from 'awilix';
import { CommentRepository } from "../data/repository/CommentRepository";
import * as mongoose from "mongoose";
import mongoModelsConfig from "./MongoConfig";
import { CreateComment } from "../domain/use-cases/CreateComment";
import { DeleteComment } from "../domain/use-cases/DeleteComment";
import { GetCommentById } from "../domain/use-cases/GetCommentById";
import { GetComments } from "../domain/use-cases/GetComments";
import { UpdateComment } from "../domain/use-cases/UpdateComment";

export interface ContainerReq extends Request {
    container: awilix.AwilixContainer;
}

export default function makeContainer(connection: mongoose.Connection) {
    const container = awilix.createContainer();
    const commentModel = mongoModelsConfig(connection).commentModel;

    container.register({

        //Other Values
        mongoConnection: awilix.asValue(connection),

        // Models
        CommentModel: awilix.asValue(commentModel),

        // Repositories
        commentRepository: awilix.asClass(CommentRepository).singleton(),

        // Use-Cases
        createComment: awilix.asClass(CreateComment).singleton(),
        deleteComment: awilix.asClass(DeleteComment).singleton(),
        getCommentById: awilix.asClass(GetCommentById).singleton(),
        getComments: awilix.asClass(GetComments).singleton(),
        updateComment: awilix.asClass(UpdateComment).singleton(),

    })

    return container;
};