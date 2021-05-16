import { GetPosts } from "../../domain/use-cases/post/GetPosts";
import { GetCommentsWithUser } from "../../domain/use-cases/comment/GetCommentsWithUser";
import to from "await-to-js";
import { IComment, IPost, IPostUser } from "../../domain/entities/types";
import { GetPostUsersWithRatings } from "../../domain/use-cases/user/GetPostUsersWithRatings";
import { GetPostById } from "../../domain/use-cases/post/GetPostById";
import { GetPostUserById } from "../../domain/use-cases/user/GetPostUserById";

interface PostServiceProps {
    getPosts: GetPosts;
    getPostById: GetPostById;
    getCommentsWithUser: GetCommentsWithUser;
    getPostUserById: GetPostUserById;
    getPostUsersWithRatings: GetPostUsersWithRatings;
}

export class PostService {
    private getPostUserById: GetPostUserById;
    private getCommentsWithUser: GetCommentsWithUser;
    private getPosts: GetPosts;
    private getPostById: GetPostById;
    private getPostUsersWithRatings: GetPostUsersWithRatings;

    constructor({getPosts, getPostById, getCommentsWithUser, getPostUserById, getPostUsersWithRatings}: PostServiceProps) {
        this.getPosts = getPosts;
        this.getPostById = getPostById;
        this.getCommentsWithUser = getCommentsWithUser;
        this.getPostUserById = getPostUserById;
        this.getPostUsersWithRatings = getPostUsersWithRatings;
    }

    async getAll() {
        const [err, posts] = await to<IPost[]>(this.getPosts.execute({}));
        if (err) throw err;

        const [err2, comments] = await to<IComment[]>(this.getCommentsWithUser.execute({}));
        if (err2) throw err2;

        const [err3, users] = await to<any[]>(this.getPostUsersWithRatings.execute({}));
        if (err3) throw err3;

        return posts.map(post => {
            const postUser = users.find(user => post.userID === user.userID);
            const postComments = comments.filter(comment => post._id === comment.postID);
            return {
                post,
                postUser,
                postComments
            }
        })
    }

    async getOne(postID: string) {
        const [err, post] = await to<IPost>(this.getPostById.execute(postID));
        if (err) throw err;

        const [err2, comments] = await to<any>(this.getCommentsWithUser.execute({postID}));
        if (err2) throw err2;

        const [err3, users] = await to<any[]>(this.getPostUsersWithRatings.execute({userID: post.userID}));
        if (err3) throw err3;
        if (!users[0]) throw new Error('No PostUser with such userID exists');

        return {
            post,
            postComments: comments,
            postUser: users[0],
        }
    }

}