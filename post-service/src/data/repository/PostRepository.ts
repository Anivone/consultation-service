import { IPostRepository } from "../../domain/gateway/IPostRepository";
import { IPost } from "../../domain/entities/types";
import { Post } from "../../domain/entities/Post";

export class PostRepository implements IPostRepository {

    private static ID = 1;
    private memoryDB: Map<number, Post> = new Map<number, Post>();

    createPost(postProps: IPost): Promise<Post> {
        const post = new Post(postProps);
        this.memoryDB.set(++PostRepository.ID, post);

        return Promise.resolve(post);
    }

    deletePost(postID: string): Promise<void> {
        this.memoryDB.delete(parseInt(postID));

        return Promise.resolve();
    }

    getPostById(postID: string): Promise<Post> {
        return Promise.resolve(this.memoryDB.get(parseInt(postID)));
    }

    getPosts(filter?: any): Promise<Post[]> {
        return Promise.resolve(
            Array.from(this.memoryDB.values())
        );
    }

    updatePost(postID: string, updateProps: any): Promise<void> {
        return Promise.resolve();
    }

}