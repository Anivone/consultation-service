import { Body, Controller, Delete, Get, Param, Patch, Req, Post } from "routing-controllers";
import { IConsultation } from "../../domain/entities/types";
import { ContainerReq } from "../../config/Container";

@Controller('/consultations')
export class ConsultationController {

    @Get('/')
    async getConsultations(@Req() req: ContainerReq): Promise<IConsultation[]> {
        const { getConsultations } = req.container.cradle;
        return await getConsultations.execute();
    }

    @Get('/:id')
    async getConsultation(@Req() req: ContainerReq, @Param('id') id: string): Promise<IConsultation> {
        const { getConsultationById } = req.container.cradle;
        return await getConsultationById.execute(id);
    }

    @Post('/')
    async createConsultation(@Req() req: ContainerReq, @Body() consultationProps: IConsultation): Promise<IConsultation> {
        const { createConsultation } = req.container.cradle;
        return await createConsultation.execute(consultationProps);
    }

    @Patch('/:id')
    async updateConsultation(@Req() req: ContainerReq, @Body() updateProps: any, @Param('id') id: string): Promise<IConsultation> {
        const { updateConsultation } = req.container.cradle;
        return await updateConsultation.execute({ id, updateProps });
    }

    @Delete('/:id')
    async deleteConsultation(@Req() req: ContainerReq, @Param('id') id: string): Promise<IConsultation> {
        const { deleteConsultation } = req.container.cradle;
        return await deleteConsultation.execute(id);
    }

}
