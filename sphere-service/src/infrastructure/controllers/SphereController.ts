import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from "routing-controllers";
import { ISpecialty, ISphere } from "../../domain/entities/types";
import { ContainerReq } from "../../config/Container";
import { AddSpecialty } from "../../domain/use-cases/AddSpecialty";
import { DeleteSpecialty } from "../../domain/use-cases/DeleteSpecialty";
import { AddTag } from "../../domain/use-cases/AddTag";
import { DeleteTag } from "../../domain/use-cases/DeleteTag";

@Controller('/spheres')
export class SphereController {

    @Get('/')
    async getSpheres(@Req() req: ContainerReq): Promise<ISphere[]> {
        const { getSpheres } = req.container.cradle;
        return await getSpheres.execute();
    }

    @Get('/:id')
    async getSphere(@Req() req: ContainerReq, @Param('id') id: string): Promise<ISphere> {
        const { getSphereById } = req.container.cradle;
        return await getSphereById.execute(id);
    }

    @Post('/')
    async createSphere(@Req() req: ContainerReq, @Body() sphereProps: ISphere): Promise<ISphere> {
        const { createSphere } = req.container.cradle;
        return await createSphere.execute(sphereProps);
    }

    @Post('/:id/specialties')
    async addSpecialty(@Req() req: ContainerReq, @Param('id') sphereID: string,
                       @Body() specialty: ISpecialty): Promise<ISphere> {
        const { addSpecialty }: { addSpecialty: AddSpecialty } = req.container.cradle;
        return await addSpecialty.execute({ id: sphereID, specialty });
    }

    @Post('/:id/tags')
    async addTag(@Req() req: ContainerReq, @Param('id') sphereID: string,
                 @Body() tag: { name: string }): Promise<ISphere> {
        const { addTag }: { addTag: AddTag } = req.container.cradle;
        return await addTag.execute({ id: sphereID, tagName: tag.name });
    }

    @Patch('/:id')
    async updateSphere(@Req() req: ContainerReq, @Body() updateProps: any, @Param('id') id: string): Promise<ISphere> {
        const { updateSphere } = req.container.cradle;
        return await updateSphere.execute({ id, updateProps });
    }

    @Delete('/:id')
    async deleteSphere(@Req() req: ContainerReq, @Param('id') id: string): Promise<ISphere> {
        const { deleteSphere } = req.container.cradle;
        return await deleteSphere.execute(id);
    }

    @Delete('/:postID/specialties/:id')
    async deleteSpecialty(@Req() req: ContainerReq,
                          @Param('postID') postID: string,
                          @Param('id') id: string): Promise<ISphere> {
        const { deleteSpecialty }: { deleteSpecialty: DeleteSpecialty } = req.container.cradle;
        return await deleteSpecialty.execute({ id: postID, specialtyID: id });
    }

    @Delete('/:postID/tags/:name')
    async deleteTag(@Req() req: ContainerReq,
                          @Param('postID') postID: string,
                          @Param('name') name: string): Promise<ISphere> {
        const { deleteTag }: { deleteTag: DeleteTag } = req.container.cradle;
        return await deleteTag.execute({ id: postID, tagName: name });
    }

}
