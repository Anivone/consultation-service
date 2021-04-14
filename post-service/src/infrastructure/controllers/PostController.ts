import { Body, Controller, Get, Post as POST, Req } from "routing-controllers";
import { IPost } from "../../domain/entities/types";
import { Post } from "../../domain/entities/Post";
import { ContainerReq } from "../../config/Container";

@Controller('/posts')
export class PostController {

    @Get('/')
    async getPosts(@Req() req: ContainerReq): Promise<Post[]> {
        const { postRepository } = req.container.cradle;

        return postRepository.getPosts();
    }

    @POST('/')
    async createPost(@Req() req: ContainerReq, @Body() postProps: IPost): Promise<Post> {
        const { postRepository } = req.container.cradle;
        const post = new Post(postProps);

        return postRepository.createPost(post);
    }
}
