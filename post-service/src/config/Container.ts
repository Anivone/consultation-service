import * as awilix from 'awilix';
import { PostRepository } from "../data/repository/PostRepository";
import { IPostRepository } from "../domain/gateway/IPostRepository";

export interface ContainerReq extends Request {
    container: awilix.AwilixContainer;
}

export default function makeContainer() {
    const container = awilix.createContainer();

    container.register({

        postRepository: awilix.asClass(PostRepository).singleton()

    })

    return container;
};