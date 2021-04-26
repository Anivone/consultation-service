import { Body, Controller, Delete, Get, Param, Patch, Req, Post } from "routing-controllers";
import { IConsultation } from "../../domain/entities/types";
import { Consultation } from "../../domain/entities/Consultation";
import { ContainerReq } from "../../config/Container";
import { IConsultationDocument } from "../../data/schemas/ConsultationSchema";
import ConsultationDTO from "../dto/ConsultationDTO";

@Controller('/consultations')
export class ConsultationController {

    @Get('/')
    async getConsultations(@Req() req: ContainerReq): Promise<ConsultationDTO[]> {
        const { getConsultations } = req.container.cradle;
        const consultations: IConsultationDocument[] = await getConsultations.execute();

        return consultations.map((consultation: IConsultationDocument) => consultation ? new ConsultationDTO(consultation) : null);
    }

    @Get('/:id')
    async getConsultation(@Req() req: ContainerReq, @Param('id') id: string): Promise<ConsultationDTO> {
        const { getConsultationById } = req.container.cradle;
        const consultation: IConsultationDocument = await getConsultationById.execute(id);

        return consultation ? new ConsultationDTO(consultation) : null;
    }

    @Post('/')
    async createConsultation(@Req() req: ContainerReq, @Body() consultationProps: IConsultation): Promise<ConsultationDTO> {
        const { createConsultation } = req.container.cradle;
        const consultation: IConsultationDocument = await createConsultation.execute(new Consultation(consultationProps));

        return new ConsultationDTO(consultation);
    }

    @Patch('/:id')
    async updateConsultation(@Req() req: ContainerReq, @Body() updateProps: any, @Param('id') id: string): Promise<ConsultationDTO> {
        const { updateConsultation } = req.container.cradle;
        const consultation: IConsultationDocument = await updateConsultation.execute({ id, updateProps});

        return new ConsultationDTO(consultation);
    }

    @Delete('/:id')
    async deleteConsultation(@Req() req: ContainerReq, @Param('id') id: string): Promise<ConsultationDTO> {
        const { deleteConsultation } = req.container.cradle;
        const consultation: IConsultationDocument = await deleteConsultation.execute(id);

        return new ConsultationDTO(consultation);
    }

}
