import { Body, Controller, Delete, Get, Param, Patch, Post as POST, Req } from "routing-controllers";
import { IPost } from "../../domain/entities/types";
import { ContainerReq } from "../../config/Container";
import { PostService } from "../services/PostService";

@Controller('/posts')
export class PostController {

    @Get('/')
    async getPosts(@Req() req: ContainerReq): Promise<any> {
        const { postService }: { postService: PostService } = req.container.cradle;
        return postService.getAll();
    }

    @Get('/:id')
    async getPost(@Req() req: ContainerReq, @Param('id') id: string): Promise<any> {
        const { postService }: { postService: PostService } = req.container.cradle;
        return postService.getOne(id);
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

    @Patch('/:id/vote')
    async votePost(@Req() req: ContainerReq, @Body() updateProps: any, @Param('id') id: string): Promise<any> {
        const { updatePost } = req.container.cradle;
        console.log('[X] updateProps: ', updateProps);
        return await updatePost.execute({ id, updateProps: {
                $inc: {
                    relevance: updateProps.vote
                }
            }})
    }

    @Delete('/:id')
    async deletePost(@Req() req: ContainerReq, @Param('id') id: string): Promise<IPost> {
        const { deletePost } = req.container.cradle;
        return await deletePost.execute(id);
    }

}
