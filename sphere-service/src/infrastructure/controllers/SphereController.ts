import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from "routing-controllers";
import { ISphere } from "../../domain/entities/types";
import { Sphere } from "../../domain/entities/Sphere";
import { ContainerReq } from "../../config/Container";
import SphereDTO from "../dto/SphereDTO";

@Controller('/spheres')
export class SphereController {

    @Get('/')
    async getSpheres(@Req() req: ContainerReq): Promise<SphereDTO[]> {
        const {getSpheres} = req.container.cradle;
        return await getSpheres.execute();
    }

    @Get('/:id')
    async getSphere(@Req() req: ContainerReq, @Param('id') id: string): Promise<SphereDTO> {
        const {getSphereById} = req.container.cradle;
        return await getSphereById.execute(id);
    }

    @Post('/')
    async createSphere(@Req() req: ContainerReq, @Body() sphereProps: ISphere): Promise<SphereDTO> {
        const {createSphere} = req.container.cradle;
        return await createSphere.execute(new Sphere(sphereProps));
    }

    @Patch('/:id')
    async updateSphere(@Req() req: ContainerReq, @Body() updateProps: any, @Param('id') id: string): Promise<SphereDTO> {
        const {updateSphere} = req.container.cradle;
        return await updateSphere.execute({id, updateProps});
    }

    @Delete('/:id')
    async deleteSphere(@Req() req: ContainerReq, @Param('id') id: string): Promise<SphereDTO> {
        const {deleteSphere} = req.container.cradle;
        return await deleteSphere.execute(id);
    }

}
