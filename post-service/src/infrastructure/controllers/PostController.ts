import { Body, Controller, Delete, Get, Param, Patch, Post as POST, Req } from "routing-controllers";
import { IPost } from "../../domain/entities/types";
import { Post } from "../../domain/entities/Post";
import { ContainerReq } from "../../config/Container";
import { IPostDocument } from "../../data/schemas/PostSchema";
import PostDTO from "../dto/PostDTO";

@Controller('/posts')
export class PostController {

    @Get('/')
    async getPosts(@Req() req: ContainerReq): Promise<PostDTO[]> {
        const { getPosts } = req.container.cradle;
        const posts = await getPosts.execute();

        return posts.map((post: IPostDocument) => new PostDTO(post));
    }

    @Get('/:id')
    async getPost(@Req() req: ContainerReq, @Param('id') id: string): Promise<PostDTO> {
        const { getPostById } = req.container.cradle;
        const post: IPostDocument = await getPostById.execute(id);

        return new PostDTO(post);
    }

    @POST('/')
    async createPost(@Req() req: ContainerReq, @Body() postProps: IPost): Promise<PostDTO> {
        const { createPost } = req.container.cradle;
        const post = await createPost.execute(new Post(postProps));

        return new PostDTO(post);
    }

    @Patch('/:id')
    async updatePost(@Req() req: ContainerReq, @Body() updateProps: any, @Param('id') id: string): Promise<PostDTO> {
        const { updatePost } = req.container.cradle;
        const post: IPostDocument = await updatePost.execute({ id, updateProps});

        return new PostDTO(post);
    }

    @Delete('/:id')
    async deletePost(@Req() req: ContainerReq, @Param('id') id: string): Promise<PostDTO> {
        const { deletePost } = req.container.cradle;
        const post: IPostDocument = await deletePost.execute(id);

        return new PostDTO(post);
    }

}
