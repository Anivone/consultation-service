import * as awilix from 'awilix';
import { PostRepository } from "../data/repository/PostRepository";
import * as mongoose from "mongoose";

export interface ContainerReq extends Request {
    container: awilix.AwilixContainer;
}

export default function makeContainer(connection: mongoose.Connection) {
    const container = awilix.createContainer();

    container.register({

        mongoConnection: awilix.asValue(connection),
        postRepository: awilix.asClass(PostRepository).singleton()

    })

    return container;
};