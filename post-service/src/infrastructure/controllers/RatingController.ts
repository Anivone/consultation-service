import {
    Body,
    Delete,
    Get,
    JsonController,
    Param,
    Patch,
    Post,
    Req,
} from "routing-controllers";
import { IRating } from "../../domain/entities/types";
import { Rating } from "../../domain/entities/Rating";
import { ContainerReq } from "../../config/Container";

@JsonController('/posts/users/ratings')
export class RatingController {

    @Get('/')
    async getRatings(@Req() req: ContainerReq): Promise<IRating[]> {
        const { getRatings } = req.container.cradle;
        return await getRatings.execute();
    }

    @Get('/:id')
    async getRating(@Req() req: ContainerReq, @Param('id') id: string): Promise<IRating> {
        const { getRatingById } = req.container.cradle;
        return await getRatingById.execute(id);
    }

    @Post('/')
    async createRating(@Req() req: ContainerReq, @Body() ratingProps: IRating): Promise<IRating> {
        const { createRating } = req.container.cradle;
        return await createRating.execute(new Rating(ratingProps));
    }

    @Patch('/:id')
    async updateRating(@Req() req: ContainerReq, @Body() updateProps: any, @Param('id') id: string): Promise<IRating> {
        const { updateRating } = req.container.cradle;
        return await updateRating.execute({ id, updateProps });
    }

    @Delete('/:id')
    async deleteRating(@Req() req: ContainerReq, @Param('id') id: string): Promise<IRating> {
        const { deleteRating } = req.container.cradle;
        return await deleteRating.execute(id);
    }

}
