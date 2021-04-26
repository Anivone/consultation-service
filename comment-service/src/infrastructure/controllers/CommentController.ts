import { Body, Controller, Delete, Get, Param, Patch, Req, Post } from "routing-controllers";
import { IComment } from "../../domain/entities/types";
import { Comment } from "../../domain/entities/Comment";
import { ContainerReq } from "../../config/Container";
import { ICommentDocument } from "../../data/schemas/CommentSchema";
import CommentDTO from "../dto/CommentDTO";

@Controller('/comments')
export class CommentController {

    @Get('/')
    async getComments(@Req() req: ContainerReq): Promise<CommentDTO[]> {
        const { getComments } = req.container.cradle;
        const comments: ICommentDocument[] = await getComments.execute();

        return comments.map((comment: ICommentDocument) => comment ? new CommentDTO(comment) : null);
    }

    @Get('/:id')
    async getComment(@Req() req: ContainerReq, @Param('id') id: string): Promise<CommentDTO> {
        const { getCommentById } = req.container.cradle;
        const comment: ICommentDocument = await getCommentById.execute(id);

        return comment ? new CommentDTO(comment) : null;
    }

    @Post('/')
    async createComment(@Req() req: ContainerReq, @Body() commentProps: IComment): Promise<CommentDTO> {
        const { createComment } = req.container.cradle;
        const comment: ICommentDocument = await createComment.execute(new Comment(commentProps));

        return new CommentDTO(comment);
    }

    @Patch('/:id')
    async updateComment(@Req() req: ContainerReq, @Body() updateProps: any, @Param('id') id: string): Promise<CommentDTO> {
        const { updateComment } = req.container.cradle;
        const comment: ICommentDocument = await updateComment.execute({ id, updateProps});

        return new CommentDTO(comment);
    }

    @Delete('/:id')
    async deleteComment(@Req() req: ContainerReq, @Param('id') id: string): Promise<CommentDTO> {
        const { deleteComment } = req.container.cradle;
        const comment: ICommentDocument = await deleteComment.execute(id);

        return new CommentDTO(comment);
    }

}
