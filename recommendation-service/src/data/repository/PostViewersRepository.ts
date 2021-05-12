import { IPostViewersRepository } from "../../domain/gateway/IPostViewersRepository";
import { IPostViewers } from "../../domain/entities/types";
import { IPostViewersModel } from "../schemas/PostViewersSchema";
import to from "await-to-js";
import { PostViewers } from "../../domain/entities/PostViewers";

interface PostViewersRepositoryProps {
    PostViewersModel: IPostViewersModel;
}

export class PostViewersRepository implements IPostViewersRepository {

    PostViewersModel: IPostViewersModel;

    constructor({ PostViewersModel }: PostViewersRepositoryProps) {
        this.PostViewersModel = PostViewersModel;
    }

    async createPostViewers(postViewersProps: IPostViewers): Promise<PostViewers> {
        const [err, postViewers] = await to<IPostViewers>(new this.PostViewersModel({
            viewersID: postViewersProps.viewersID,
            tags: postViewersProps.tags,
        }).save());

        if (err) throw err;

        return this.PostViewersModel.toPostViewers(postViewers);
    }

    async deletePostViewers(postViewersID: string): Promise<PostViewers> {
        return this.PostViewersModel.toPostViewers(await this.PostViewersModel.findByIdAndRemove(postViewersID));
    }

    async getPostViewersById(postViewersID: string): Promise<PostViewers> {
        return this.PostViewersModel.toPostViewers(await this.PostViewersModel.findById(postViewersID));
    }

    async getPostViewers(filter?: any): Promise<PostViewers[]> {
        const postViewers: IPostViewers[] = await this.PostViewersModel.find(filter);

        return postViewers.map(postViewers => this.PostViewersModel.toPostViewers(postViewers));
    }

    async updatePostViewers(postViewersID: string, updateProps: any): Promise<PostViewers> {
        return this.PostViewersModel.toPostViewers(
            await this.PostViewersModel.findByIdAndUpdate(postViewersID, updateProps));
    }

}