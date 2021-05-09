import { Body, Controller, Delete, Get, Param, Patch, Post as POST, Req } from "routing-controllers";
import { IPost } from "../../domain/entities/types";
import { Post } from "../../domain/entities/Post";
import { ContainerReq } from "../../config/Container";

@Controller('/posts')
export class PostController {

    @Get('/')
    async getPosts(@Req() req: ContainerReq): Promise<IPost[]> {
        const { getPosts } = req.container.cradle;
        const posts: IPost[] = await getPosts.execute();

        return posts.map(post => new Post(post));
    }

    @Get('/:id')
    async getPost(@Req() req: ContainerReq, @Param('id') id: string): Promise<IPost> {
        const { getPostById } = req.container.cradle;
        return await getPostById.execute(id);
    }

    @POST('/')
    async createPost(@Req() req: ContainerReq, @Body() postProps: IPost): Promise<IPost> {
        const { createPost } = req.container.cradle;
        return await createPost.execute(postProps);
    }

    @Patch('/:id')
    async updatePost(@Req() req: ContainerReq, @Body() updateProps: any, @Param('id') id: string): Promise<IPost> {
        const { updatePost } = req.container.cradle;
        return await updatePost.execute({ id, updateProps });
    }

    @Delete('/:id')
    async deletePost(@Req() req: ContainerReq, @Param('id') id: string): Promise<IPost> {
        const { deletePost } = req.container.cradle;
        return await deletePost.execute(id);
    }

}
