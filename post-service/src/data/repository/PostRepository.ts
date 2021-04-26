import { IPostRepository } from "../../domain/gateway/IPostRepository";
import { IPost } from "../../domain/entities/types";
import { Post } from "../../domain/entities/Post";
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

    async createPost(postProps: IPost): Promise<IPostDocument> {
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

        return post;
    }

    async deletePost(postID: string): Promise<IPostDocument> {
        return this.PostModel.findByIdAndRemove(postID);
    }

    async getPostById(postID: string): Promise<IPostDocument> {
        return this.PostModel.findById(postID);

    }

    async getPosts(filter?: any): Promise<IPostDocument[]> {
        return this.PostModel.find(filter);
    }

    async updatePost(postID: string, updateProps: any): Promise<IPostDocument> {
        return this.PostModel.findByIdAndUpdate(postID, updateProps);
    }

}