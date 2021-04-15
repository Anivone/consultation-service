import { Body, Controller, Get, Post as POST, Req } from "routing-controllers";
import { IPost } from "../../domain/entities/types";
import { Post } from "../../domain/entities/Post";
import { ContainerReq } from "../../config/Container";

@Controller('/posts')
export class PostController {

    @Get('/')
    async getPosts(@Req() req: ContainerReq): Promise<Post[]> {
        const { getPosts } = req.container.cradle;

        return getPosts.execute();
    }

    @POST('/')
    async createPost(@Req() req: ContainerReq, @Body() postProps: IPost): Promise<Post> {
        const { createPost } = req.container.cradle;
        const post = new Post(postProps);

        return createPost.execute(post);
    }
}
