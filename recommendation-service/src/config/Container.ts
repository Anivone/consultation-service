import * as awilix from 'awilix';
import { UserTagsRepository } from "../data/repository/UserTagsRepository";
import * as mongoose from "mongoose";
import mongoModelsConfig from "./MongoConfig";
import { CreateUserTags } from "../domain/use-cases/userTags/CreateUserTags";
import { DeleteUserTags } from "../domain/use-cases/userTags/DeleteUserTags";
import { GetUserTagsById } from "../domain/use-cases/userTags/GetUserTagsById";
import { GetUserTags } from "../domain/use-cases/userTags/GetUserTags";
import { UpdateUserTags } from "../domain/use-cases/userTags/UpdateUserTags";
import { AddTag } from "../domain/use-cases/userTags/AddTag";
import { DeleteTag } from "../domain/use-cases/userTags/DeleteTag";
import { PostViewersRepository } from "../data/repository/PostViewersRepository";
import { CreatePostViewers } from "../domain/use-cases/postViewers/CreatePostViewers";
import { DeletePostViewers } from "../domain/use-cases/postViewers/DeletePostViewers";
import { GetPostViewers } from "../domain/use-cases/postViewers/GetPostViewers";
import { GetPostViewersById } from "../domain/use-cases/postViewers/GetPostViewersById";
import { UpdatePostViewers } from "../domain/use-cases/postViewers/UpdatePostViewers";
import { AddViewer } from "../domain/use-cases/postViewers/AddViewer";
import { DeleteViewer } from "../domain/use-cases/postViewers/DeleteViewer";
import { GetRecommendedPosts } from "../domain/use-cases/GetRecommendedPosts";

export interface ContainerReq extends Request {
    container: awilix.AwilixContainer;
}

export default function makeContainer(connection: mongoose.Connection) {
    const container = awilix.createContainer();
    const { postViewersModel, userTagsModel } = mongoModelsConfig(connection);

    container.register({

        //Other Values
        mongoConnection: awilix.asValue(connection),

        // Models
        UserTagsModel: awilix.asValue(userTagsModel),
        PostViewersModel: awilix.asValue(postViewersModel),

        // Repositories
        userTagsRepository: awilix.asClass(UserTagsRepository).singleton(),
        postViewersRepository: awilix.asClass(PostViewersRepository).singleton(),

        // Use-Cases
        createUserTags: awilix.asClass(CreateUserTags).singleton(),
        deleteUserTags: awilix.asClass(DeleteUserTags).singleton(),
        getUserTagsById: awilix.asClass(GetUserTagsById).singleton(),
        getUserTags: awilix.asClass(GetUserTags).singleton(),
        updateUserTags: awilix.asClass(UpdateUserTags).singleton(),
        addTag: awilix.asClass(AddTag).singleton(),
        deleteTag: awilix.asClass(DeleteTag).singleton(),

        createPostViewers: awilix.asClass(CreatePostViewers).singleton(),
        deletePostViewers: awilix.asClass(DeletePostViewers).singleton(),
        getPostViewersById: awilix.asClass(GetPostViewersById).singleton(),
        getPostViewers: awilix.asClass(GetPostViewers).singleton(),
        updatePostViewers: awilix.asClass(UpdatePostViewers).singleton(),
        addViewer: awilix.asClass(AddViewer).singleton(),
        deleteViewer: awilix.asClass(DeleteViewer).singleton(),

        getRecommendedPosts: awilix.asClass(GetRecommendedPosts).singleton(),

    })

    return container;
};