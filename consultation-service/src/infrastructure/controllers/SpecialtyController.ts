import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from "routing-controllers";
import { ISpecialty } from "../../domain/entities/types";
import { ContainerReq } from "../../config/Container";

@Controller('/consultations/specialties')
export class SpecialtyController {

    @Get('/')
    async getSpecialties(@Req() req: ContainerReq): Promise<ISpecialty[]> {
        const { getSpecialties } = req.container.cradle;
        return await getSpecialties.execute();
    }

    @Get('/:id')
    async getSpecialty(@Req() req: ContainerReq, @Param('id') id: string): Promise<ISpecialty> {
        const { getSpecialtyById } = req.container.cradle;
        return await getSpecialtyById.execute(id);
    }

    @Post('/')
    async createSpecialty(@Req() req: ContainerReq, @Body() specialtyProps: ISpecialty): Promise<ISpecialty> {
        const { createSpecialty } = req.container.cradle;
        return await createSpecialty.execute(specialtyProps);
    }

    @Patch('/:id')
    async updateSpecialty(@Req() req: ContainerReq, @Body() updateProps: any, @Param('id') id: string): Promise<ISpecialty> {
        const { updateSpecialty } = req.container.cradle;
        return await updateSpecialty.execute({ id, updateProps });
    }

    @Delete('/:id')
    async deleteSpecialty(@Req() req: ContainerReq, @Param('id') id: string): Promise<ISpecialty> {
        const { deleteSpecialty } = req.container.cradle;
        return await deleteSpecialty.execute(id);
    }

}
