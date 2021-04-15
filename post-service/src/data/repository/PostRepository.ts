import { IPostRepository } from "../../domain/gateway/IPostRepository";
import { IPost } from "../../domain/entities/types";
import { Post } from "../../domain/entities/Post";
import * as mongoose from "mongoose";
import { IPostDocument, IPostModel } from "../schemas/PostSchema";
import to from "await-to-js";

interface PostRepositoryProps {
    PostModel: IPostModel;
}

export class PostRepository implements IPostRepository {

    PostModel: IPostModel;

    constructor({ PostModel } : PostRepositoryProps) {
        this.PostModel = PostModel;
    }

    async createPost(postProps: IPost): Promise<Post> {
        const [err, post] = await to<IPostDocument>(new this.PostModel({
            title: postProps.title,
            description: postProps.description,
            userID: postProps.userID,
            relevance: postProps.relevance,
            date: postProps.date,
            views: postProps.views,
            sphereID: postProps.sphereID,
            status: postProps.status,
            edited: postProps.edited
        }).save());

        if (err) throw new Error(err.message);

        return this.PostModel.toPost(post);
    }

    deletePost(postID: string): Promise<void> {
        return Promise.resolve(undefined);
    }

    getPostById(postID: string): Promise<Post> {
        return Promise.resolve(undefined);
    }

    async getPosts(filter?: any): Promise<Post[]> {
        const posts = await this.PostModel.find(filter);

        return posts.map(post => this.PostModel.toPost(post));
    }

    updatePost(postID: string, updateProps: any): Promise<void> {
        return Promise.resolve(undefined);
    }

}