import { IPost } from "../entities/types";
import { Post } from "../entities/Post";

export interface IPostRepository {

    getPosts(filter?: any): Promise<Post[]>;

    getPostById(postID: string): Promise<Post>;

    createPost(postProps: IPost): Promise<Post>;

    updatePost(postID: string, updateProps: any): Promise<void>;

    deletePost(postID: string): Promise<void>;

}