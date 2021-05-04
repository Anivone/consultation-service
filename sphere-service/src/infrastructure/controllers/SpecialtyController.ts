import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from "routing-controllers";
import { ISpecialty } from "../../domain/entities/types";
import { ContainerReq } from "../../config/Container";
import SpecialtyDTO from "../dto/SpecialtyDTO";

@Controller('/specialties')
export class SpecialtyController {

    @Get('/')
    async getSpecialties(@Req() req: ContainerReq): Promise<SpecialtyDTO[]> {
        const {getSpecialties} = req.container.cradle;
        return await getSpecialties.execute();
    }

    @Get('/:id')
    async getSpecialty(@Req() req: ContainerReq, @Param('id') id: string): Promise<SpecialtyDTO> {
        const {getSpecialtyById} = req.container.cradle;
        return await getSpecialtyById.execute(id);
    }

    @Post('/')
    async createSpecialty(@Req() req: ContainerReq, @Body() specialtyProps: ISpecialty): Promise<SpecialtyDTO> {
        const {createSpecialty} = req.container.cradle;
        return await createSpecialty.execute(specialtyProps);
    }

    @Patch('/consultations/:id')
    async changeConsultationsNumber(@Req() req: ContainerReq, @Body() updateProps: any, @Param('id') id: string): Promise<SpecialtyDTO> {
        const {changeConsultationsNumber} = req.container.cradle;
        return await changeConsultationsNumber.execute({specialtyID: id, ...updateProps});
    }

    @Patch('/posts/:id')
    async changePostsNumber(@Req() req: ContainerReq, @Body() updateProps: any, @Param('id') id: string): Promise<SpecialtyDTO> {
        const {changePostsNumber} = req.container.cradle;
        return await changePostsNumber.execute({specialtyID: id, ...updateProps});
    }

    @Delete('/:id')
    async deleteSpecialty(@Req() req: ContainerReq, @Param('id') id: string): Promise<SpecialtyDTO> {
        const {deleteSpecialty} = req.container.cradle;
        return await deleteSpecialty.execute(id);
    }

}
