import { IUseCase } from "./types";
import { IPostViewers, IUserTags } from "../entities/types";
import { GetUserTags } from "./userTags/GetUserTags";
import { GetPostViewers } from "./postViewers/GetPostViewers";
import to from "await-to-js";

interface GetRecommendedPostsProps {
    getUserTags: GetUserTags;
    getPostViewers: GetPostViewers;
}

export class GetRecommendedPosts implements IUseCase<string[]> {
    getUserTags: GetUserTags;
    getPostViewers: GetPostViewers;


    constructor({ getUserTags, getPostViewers }: GetRecommendedPostsProps) {
        this.getUserTags = getUserTags;
        this.getPostViewers = getPostViewers;
    }

    async execute(userID: string): Promise<string[]> {
        const [err, userTags] = await to<IUserTags[]>(this.getUserTags.execute({ userID }));
        if (err) throw err;
        if (!userTags[0]) throw new Error("UserTags for specified user was not found");

        const tags = userTags[0].tags;
        const [err2, posts] = await to<IPostViewers[]>(this.getPostViewers.execute(
            {
                tags: {
                    $in: tags
                },
                viewersID: {
                    $nin: [userID]
                }
            })
        );
        if (err2) throw err2;

        return posts ? posts.map(posts => posts._id) : [];
    }

}