import { Body, Controller, Delete, Get, Param, Patch, Req, Post } from "routing-controllers";
import { IComment } from "../../domain/entities/types";
import { ContainerReq } from "../../config/Container";

@Controller('/posts/comments')
export class CommentController {

    @Get('/')
    async getComments(@Req() req: ContainerReq): Promise<IComment[]> {
        const { getCommentsWithUser } = req.container.cradle;
        return await getCommentsWithUser.execute();
    }

    @Get('/:id')
    async getComment(@Req() req: ContainerReq, @Param('id') id: string): Promise<IComment> {
        const { getCommentById } = req.container.cradle;
        return await getCommentById.execute(id);
    }

    @Post('/')
    async createComment(@Req() req: ContainerReq, @Body() commentProps: IComment): Promise<IComment> {
        const { createComment } = req.container.cradle;
        return await createComment.execute(commentProps);
    }

    @Patch('/:id')
    async updateComment(@Req() req: ContainerReq, @Body() updateProps: any, @Param('id') id: string): Promise<IComment> {
        const { updateComment } = req.container.cradle;
        return await updateComment.execute({ id, updateProps});
    }

    @Patch('/:id/vote')
    async voteComment(@Req() req: ContainerReq, @Body() updateProps: any, @Param('id') id: string): Promise<any> {
        const { updateComment } = req.container.cradle;
        return await updateComment.execute({ id, updateProps: {
                $inc: {
                    points: updateProps.vote
                }
            }})
    }

    @Delete('/:id')
    async deleteComment(@Req() req: ContainerReq, @Param('id') id: string): Promise<IComment> {
        const { deleteComment } = req.container.cradle;
        return await deleteComment.execute(id);
    }

}
