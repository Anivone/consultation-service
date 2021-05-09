import { IPostRepository } from "../../domain/gateway/IPostRepository";
import { IPost } from "../../domain/entities/types";
import { IPostModel } from "../schemas/PostSchema";
import to from "await-to-js";
import { Post } from "../../domain/entities/Post";
import { Model } from "mongoose";
import { ICommentModel } from "../schemas/CommentSchema";

interface PostRepositoryProps {
    PostModel: IPostModel;
    CommentModel: ICommentModel;
}

export class PostRepository implements IPostRepository {

    PostModel: IPostModel;
    CommentModel: ICommentModel;

    constructor({ PostModel, CommentModel } : PostRepositoryProps) {
        this.PostModel = PostModel;
        this.CommentModel = CommentModel;
    }

    async createPost(postProps: IPost): Promise<Post> {
        const [err, post] = await to<IPost>(new this.PostModel({
            title: postProps.title,
            description: postProps.description,
            userID: postProps.userID,
            relevance: postProps.relevance,
            tags: postProps.tags,
            date: {
                day: postProps.date.day,
                month: postProps.date.month,
                year: postProps.date.year,
            },
            views: postProps.views,
            sphereID: postProps.sphereID,
            specialty: postProps.specialty,
            edited: postProps.edited
        }).save());

        if (err) throw err;

        return new Post(post);
    }

    async deletePost(postID: string): Promise<Post> {
        return new Post(await this.PostModel.findByIdAndRemove(postID));
    }

    async getPostById(postID: string): Promise<Post> {
        return new Post(await this.PostModel.findById(postID));
    }

    async getPosts(filter?: any): Promise<Post[]> {
        const posts = await this.PostModel.find(filter);
        return posts.map(post => new Post(post));
    }

    async updatePost(postID: string, updateProps: any): Promise<Post> {
        return new Post(await this.PostModel.findByIdAndUpdate(postID, updateProps));
    }

}