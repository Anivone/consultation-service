import { IComment, IPostUser } from "../../entities/types";
import to from "await-to-js";
import { GetComments } from "./GetComments";
import { GetPostUsersWithRatings } from "../user/GetPostUsersWithRatings";

interface GetCommentsWithUserProps {
    getComments: GetComments;
    getPostUsersWithRatings: GetPostUsersWithRatings;
}

export class GetCommentsWithUser {
    private getPostUsersWithRatings: GetPostUsersWithRatings;
    private getComments: GetComments;

    constructor({getComments, getPostUsersWithRatings}: GetCommentsWithUserProps) {
        this.getComments = getComments;
        this.getPostUsersWithRatings = getPostUsersWithRatings;
    }

    async execute(props: any): Promise<any> {
        const [err, comments] = await to<IComment[]>(
            this.getComments.execute(props));
        if (err) throw err;

        const [err2, users] = await to<IPostUser[]>(
            this.getPostUsersWithRatings.execute({})
        );
        if (err2) throw err2;

        return comments.map(comment => ({
            ...comment,
            user: users.find(user => comment.userID === user.userID),
        }))
    }

}