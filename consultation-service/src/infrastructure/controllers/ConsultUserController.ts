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
import { IConsultUser, IRating } from "../../domain/entities/types";
import { ContainerReq } from "../../config/Container";
import { Rating } from "../../domain/entities/Rating";

@JsonController('/consultations/users')
export class ConsultUserController {

    @Get('/ratings/')
    async getRatings(@Req() req: ContainerReq): Promise<IRating[]> {
        const { getRatings } = req.container.cradle;
        return await getRatings.execute();
    }

    @Get('/ratings/:id')
    async getRating(@Req() req: ContainerReq, @Param('id') id: string): Promise<IRating> {
        const { getRatingById } = req.container.cradle;
        return await getRatingById.execute(id);
    }

    @Post('/ratings/')
    async createRating(@Req() req: ContainerReq, @Body() ratingProps: IRating): Promise<IRating> {
        const { createRating } = req.container.cradle;
        return await createRating.execute(new Rating(ratingProps));
    }

    @Patch('/ratings/:id')
    async updateRating(@Req() req: ContainerReq, @Body() updateProps: any, @Param('id') id: string): Promise<IRating> {
        const { updateRating } = req.container.cradle;
        return await updateRating.execute({ id, updateProps });
    }

    @Delete('/ratings/:id')
    async deleteRating(@Req() req: ContainerReq, @Param('id') id: string): Promise<IRating> {
        const { deleteRating } = req.container.cradle;
        return await deleteRating.execute(id);
    }

    @Get('/')
    async getConsultUsers(@Req() req: ContainerReq): Promise<IConsultUser[]> {
        const { getConsultUsers } = req.container.cradle;
        return await getConsultUsers.execute();
    }

    @Get('/:id')
    async getConsultUser(@Req() req: ContainerReq, @Param('id') id: string): Promise<IConsultUser> {
        console.log('[X] getConsultUser accessed !');
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
