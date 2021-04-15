import * as awilix from 'awilix';
import { PostRepository } from "../data/repository/PostRepository";
import * as mongoose from "mongoose";
import mongoModelsConfig from "./MongoConfig";
import { CreatePost } from "../domain/use-cases/CreatePost";
import { DeletePost } from "../domain/use-cases/DeletePost";
import { GetPostById } from "../domain/use-cases/GetPostById";
import { GetPosts } from "../domain/use-cases/GetPosts";
import { UpdatePost } from "../domain/use-cases/UpdatePost";

export interface ContainerReq extends Request {
    container: awilix.AwilixContainer;
}

export default function makeContainer(connection: mongoose.Connection) {
    const container = awilix.createContainer();
    const { postModel } = mongoModelsConfig(connection);

    container.register({

        //Other Values
        mongoConnection: awilix.asValue(connection),

        // Models
        PostModel: awilix.asValue(postModel),

        // Repositories
        postRepository: awilix.asClass(PostRepository).singleton(),

        // Use-Cases
        createPost: awilix.asClass(CreatePost).singleton(),
        deletePost: awilix.asClass(DeletePost).singleton(),
        getPostById: awilix.asClass(GetPostById).singleton(),
        getPosts: awilix.asClass(GetPosts).singleton(),
        updatePost: awilix.asClass(UpdatePost).singleton(),

    })

    return container;
};