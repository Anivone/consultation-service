import { IPost } from "../entities/types";

export interface IPostRepository {

    getPosts(filter?: any): Promise<IPost[]>;

    getPostById(postID: string): Promise<IPost>;

    createPost(postProps: IPost): Promise<IPost>;

    updatePost(postID: string, updateProps: any): Promise<IPost>;

    deletePost(postID: string): Promise<IPost>;

}