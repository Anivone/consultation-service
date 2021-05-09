import * as awilix from 'awilix';
import { PostRepository } from "../data/repository/PostRepository";
import * as mongoose from "mongoose";
import mongoModelsConfig from "./MongoConfig";
import { CreatePost } from "../domain/use-cases/post/CreatePost";
import { DeletePost } from "../domain/use-cases/post/DeletePost";
import { GetPostById } from "../domain/use-cases/post/GetPostById";
import { GetPosts } from "../domain/use-cases/post/GetPosts";
import { UpdatePost } from "../domain/use-cases/post/UpdatePost";

import { CommentRepository } from "../data/repository/CommentRepository";
import { CreateComment } from "../domain/use-cases/comment/CreateComment";
import { DeleteComment } from "../domain/use-cases/comment/DeleteComment";
import { GetComments } from "../domain/use-cases/comment/GetComments";
import { UpdateComment } from "../domain/use-cases/comment/UpdateComment";
import { GetCommentById } from "../domain/use-cases/comment/GetCommentById";

export interface ContainerReq extends Request {
    container: awilix.AwilixContainer;
}

export default function makeContainer(connection: mongoose.Connection) {
    const container = awilix.createContainer();
    const { postModel, commentModel } = mongoModelsConfig(connection);

    container.register({

        //Other Values
        mongoConnection: awilix.asValue(connection),

        // Models
        PostModel: awilix.asValue(postModel),
        CommentModel: awilix.asValue(commentModel),

        // Repositories
        postRepository: awilix.asClass(PostRepository).singleton(),
        commentRepository: awilix.asClass(CommentRepository).singleton(),

        // Use-Cases
        createPost: awilix.asClass(CreatePost).singleton(),
        deletePost: awilix.asClass(DeletePost).singleton(),
        getPostById: awilix.asClass(GetPostById).singleton(),
        getPosts: awilix.asClass(GetPosts).singleton(),
        updatePost: awilix.asClass(UpdatePost).singleton(),

        createComment: awilix.asClass(CreateComment).singleton(),
        deleteComment: awilix.asClass(DeleteComment).singleton(),
        getCommentById: awilix.asClass(GetCommentById).singleton(),
        getComments: awilix.asClass(GetComments).singleton(),
        updateComment: awilix.asClass(UpdateComment).singleton(),

    })

    return container;
};