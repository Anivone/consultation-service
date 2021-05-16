import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from "routing-controllers";
import { IPostViewers } from "../../domain/entities/types";
import { ContainerReq } from "../../config/Container";

@Controller('/recommendations/post-viewers')
export class PostViewersController {

    @Get('/')
    async getPostViewers(@Req() req: ContainerReq): Promise<IPostViewers[]> {
        const { getPostViewers } = req.container.cradle;
        return await getPostViewers.execute();
    }

    @Get('/:id')
    async getPostViewer(@Req() req: ContainerReq, @Param('id') id: string): Promise<IPostViewers> {
        const { getPostViewersById } = req.container.cradle;
        return await getPostViewersById.execute(id);
    }

    @Post('/')
    async createPostViewers(@Req() req: ContainerReq, @Body() sphereProps: IPostViewers): Promise<IPostViewers> {
        const { createPostViewers } = req.container.cradle;
        return await createPostViewers.execute(sphereProps);
    }

    @Patch('/:id')
    async updatePostViewers(@Req() req: ContainerReq, @Body() updateProps: any, @Param('id') id: string): Promise<IPostViewers> {
        const { updatePostViewers } = req.container.cradle;
        return await updatePostViewers.execute({ id, updateProps });
    }

    @Delete('/:id')
    async deletePostViewers(@Req() req: ContainerReq, @Param('id') id: string): Promise<IPostViewers> {
        const { deletePostViewers } = req.container.cradle;
        return await deletePostViewers.execute(id);
    }

}