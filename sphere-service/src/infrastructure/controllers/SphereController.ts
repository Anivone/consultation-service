import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from "routing-controllers";
import { ISphere } from "../../domain/entities/types";
import { Sphere } from "../../domain/entities/Sphere";
import { ContainerReq } from "../../config/Container";
import { ISphereDocument } from "../../data/schemas/SphereModel";
import SphereDTO from "../dto/SphereDTO";

@Controller('/spheres')
export class SphereController {

    @Get('/')
    async getSpheres(@Req() req: ContainerReq): Promise<SphereDTO[]> {
        const { getSpheres } = req.container.cradle;
        const spheres: ISphereDocument[] = await getSpheres.execute();

        return spheres.map((sphere: ISphereDocument) => sphere ? new SphereDTO(sphere) : null);
    }

    @Get('/:id')
    async getSphere(@Req() req: ContainerReq, @Param('id') id: string): Promise<SphereDTO> {
        const { getSphereById } = req.container.cradle;
        const sphere: ISphereDocument = await getSphereById.execute(id);

        return sphere ? new SphereDTO(sphere) : null;
    }

    @Post('/')
    async createSphere(@Req() req: ContainerReq, @Body() sphereProps: ISphere): Promise<SphereDTO> {
        const { createSphere } = req.container.cradle;
        const sphere: ISphereDocument = await createSphere.execute(new Sphere(sphereProps));

        return new SphereDTO(sphere);
    }

    @Patch('/:id')
    async updateSphere(@Req() req: ContainerReq, @Body() updateProps: any, @Param('id') id: string): Promise<SphereDTO> {
        const { updateSphere } = req.container.cradle;
        const sphere: ISphereDocument = await updateSphere.execute({ id, updateProps});

        return new SphereDTO(sphere);
    }

    @Delete('/:id')
    async deleteSphere(@Req() req: ContainerReq, @Param('id') id: string): Promise<SphereDTO> {
        const { deleteSphere } = req.container.cradle;
        const sphere: ISphereDocument = await deleteSphere.execute(id);

        return new SphereDTO(sphere);
    }

}
