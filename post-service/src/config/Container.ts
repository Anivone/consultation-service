import * as awilix from 'awilix';
import * as mongoose from "mongoose";
import mongoModelsConfig from "./MongoConfig";

import { PostRepository } from "../data/repository/PostRepository";
import { CommentRepository } from "../data/repository/CommentRepository";
import { RatingRepository } from "../data/repository/RatingRepository";
import { PostUserRepository } from "../data/repository/PostUserRepository";

import { CreatePost } from "../domain/use-cases/post/CreatePost";
import { DeletePost } from "../domain/use-cases/post/DeletePost";
import { GetPostById } from "../domain/use-cases/post/GetPostById";
import { GetPosts } from "../domain/use-cases/post/GetPosts";
import { UpdatePost } from "../domain/use-cases/post/UpdatePost";

import { CreateComment } from "../domain/use-cases/comment/CreateComment";
import { DeleteComment } from "../domain/use-cases/comment/DeleteComment";
import { GetComments } from "../domain/use-cases/comment/GetComments";
import { UpdateComment } from "../domain/use-cases/comment/UpdateComment";
import { GetCommentById } from "../domain/use-cases/comment/GetCommentById";

import { UpdatePostUser } from "../domain/use-cases/user/UpdatePostUser";
import { CreatePostUser } from "../domain/use-cases/user/CreatePostUser";
import { PromotePostUser } from "../domain/use-cases/user/PromoteUser";
import { GetPostUsers } from "../domain/use-cases/user/GetPostUsers";
import { GetPostUserById } from "../domain/use-cases/user/GetPostUserById";
import { DeletePostUser } from "../domain/use-cases/user/DeletePostUser";

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
    const { postModel, commentModel, ratingModel, postUserModel } = mongoModelsConfig(connection);

    container.register({

        //Other Values
        mongoConnection: awilix.asValue(connection),

        // Models
        PostModel: awilix.asValue(postModel),
        CommentModel: awilix.asValue(commentModel),
        RatingModel: awilix.asValue(ratingModel),
        PostUserModel: awilix.asValue(postUserModel),

        // Repositories
        postRepository: awilix.asClass(PostRepository).singleton(),
        commentRepository: awilix.asClass(CommentRepository).singleton(),
        ratingRepository: awilix.asClass(RatingRepository).singleton(),
        postUserRepository: awilix.asClass(PostUserRepository).singleton(),

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

        createPostUser: awilix.asClass(CreatePostUser).singleton(),
        deletePostUser: awilix.asClass(DeletePostUser).singleton(),
        getPostUserById: awilix.asClass(GetPostUserById).singleton(),
        getPostUsers: awilix.asClass(GetPostUsers).singleton(),
        updatePostUser: awilix.asClass(UpdatePostUser).singleton(),
        promotePostUser: awilix.asClass(PromotePostUser).singleton(),

        createRating: awilix.asClass(CreateRating).singleton(),
        deleteRating: awilix.asClass(DeleteRating).singleton(),
        getRatingById: awilix.asClass(GetRatingById).singleton(),
        getRatings: awilix.asClass(GetRatings).singleton(),
        updateRating: awilix.asClass(UpdateRating).singleton(),

    })

    return container;
};