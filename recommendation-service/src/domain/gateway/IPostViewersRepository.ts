import { IPostViewers } from "../entities/types";

export interface IPostViewersRepository {

    getPostViewers(filter?: any): Promise<IPostViewers[]>;

    getPostViewersById(postID: string): Promise<IPostViewers>;

    createPostViewers(postProps: IPostViewers): Promise<IPostViewers>;

    updatePostViewers(postID: string, updateProps: any): Promise<IPostViewers>;

    deletePostViewers(postID: string): Promise<IPostViewers>;

}