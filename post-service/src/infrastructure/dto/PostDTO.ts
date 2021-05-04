import { IPostDocument } from "../../data/schemas/PostSchema";
import { Post } from "../../domain/entities/Post";

export default class PostDTO extends Post{

    readonly _id: string;

    constructor(postDocument: IPostDocument) {
        super({
            title: postDocument.title,
            description: postDocument.description,
            userID: postDocument.userID,
            relevance: postDocument.relevance,
            tags: postDocument.tags,
            date: postDocument.date,
            views: postDocument.views,
            sphereID: postDocument.sphereID,
            specialty: postDocument.specialty,
            status: postDocument.status,
            edited: postDocument.edited
        });

        this._id = postDocument._id.toString();
    }

}