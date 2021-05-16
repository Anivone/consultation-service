import { Controller, Get, Param, Req } from "routing-controllers";
import { ContainerReq } from "../../config/Container";
import { GetRecommendedPosts } from "../../domain/use-cases/GetRecommendedPosts";

@Controller('/recommendations')
export class RecommendationController {

    @Get('/:id')
    async getRecommendedPosts(@Req() req: ContainerReq, @Param('id') id: string): Promise<any> {
        const { getRecommendedPosts }: { getRecommendedPosts: GetRecommendedPosts} = req.container.cradle;
        return await getRecommendedPosts.execute(id);
    }

}
