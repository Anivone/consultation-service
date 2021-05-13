import {
    Body,
    Delete,
    Get,
    JsonController,
    Param,
    Patch,
    Post,
    Req
} from "routing-controllers";
import { IConsultUser } from "../../domain/entities/types";
import { ContainerReq } from "../../config/Container";

@JsonController('/consultations/users')
export class ConsultUserController {

    @Get('/')
    async getConsultUsers(@Req() req: ContainerReq): Promise<IConsultUser[]> {
        const { getConsultUsers } = req.container.cradle;
        return await getConsultUsers.execute();
    }

    @Get('/:id')
    async getConsultUser(@Req() req: ContainerReq, @Param('id') id: string): Promise<IConsultUser> {
        const { getConsultUserById } = req.container.cradle;
        return await getConsultUserById.execute(id);
    }

    @Post('/')
    async createConsultUser(@Req() req: ContainerReq, @Body() userProps: IConsultUser): Promise<IConsultUser> {
        const { createConsultUser } = req.container.cradle;
        return await createConsultUser.execute(userProps);
    }

    @Patch('/:id')
    async updateConsultUser(@Req() req: ContainerReq, @Body() updateProps: any, @Param('id') id: string): Promise<IConsultUser> {
        const { updateConsultUser } = req.container.cradle;
        return await updateConsultUser.execute({ id, updateProps });
    }

    @Delete('/:id')
    async deleteConsultUser(@Req() req: ContainerReq, @Param('id') id: string): Promise<IConsultUser> {
        const { deleteConsultUser } = req.container.cradle;
        return await deleteConsultUser.execute(id);
    }

}
