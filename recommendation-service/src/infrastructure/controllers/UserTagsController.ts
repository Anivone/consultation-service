import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from "routing-controllers";
import { IUserTags } from "../../domain/entities/types";
import { ContainerReq } from "../../config/Container";
import { AddTag } from "../../domain/use-cases/userTags/AddTag";
import { DeleteTag } from "../../domain/use-cases/userTags/DeleteTag";

@Controller('/recommendations/user-tags')
export class UserTagsController {

    @Get('/')
    async getUserTags(@Req() req: ContainerReq): Promise<IUserTags[]> {
        const { getUserTags } = req.container.cradle;
        return await getUserTags.execute();
    }

    @Get('/:id')
    async getUserTag(@Req() req: ContainerReq, @Param('id') id: string): Promise<IUserTags> {
        const { getPostViewersById } = req.container.cradle;
        return await getPostViewersById.execute(id);
    }

    @Post('/')
    async createUserTags(@Req() req: ContainerReq, @Body() userTagsProps: IUserTags): Promise<IUserTags> {
        const { createUserTags } = req.container.cradle;
        return await createUserTags.execute(userTagsProps);
    }

    @Post('/:id/tags')
    async addTag(@Req() req: ContainerReq, @Param('id') userTagsID: string,
                 @Body() tag: { name: string }): Promise<IUserTags> {
        const { addTag }: { addTag: AddTag } = req.container.cradle;
        return await addTag.execute({ id: userTagsID, tagName: tag.name });
    }

    @Patch('/:id')
    async updateUserTags(@Req() req: ContainerReq, @Body() updateProps: any, @Param('id') id: string): Promise<IUserTags> {
        const { updateUserTags } = req.container.cradle;
        return await updateUserTags.execute({ id, updateProps });
    }

    @Delete('/:id')
    async deleteUserTags(@Req() req: ContainerReq, @Param('id') id: string): Promise<IUserTags> {
        const { deleteUserTags } = req.container.cradle;
        return await deleteUserTags.execute(id);
    }

    @Delete('/:userTagsID/tags/:name')
    async deleteTag(@Req() req: ContainerReq,
                          @Param('userTagsID') userTagsId: string,
                          @Param('name') name: string): Promise<IUserTags> {
        const { deleteTag }: { deleteTag: DeleteTag } = req.container.cradle;
        return await deleteTag.execute({ id: userTagsId, tagName: name });
    }

}
