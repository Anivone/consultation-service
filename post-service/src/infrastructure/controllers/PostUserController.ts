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
import { IPostUser } from "../../domain/entities/types";
import { PostUser } from "../../domain/entities/PostUser";
import { ContainerReq } from "../../config/Container";
import { DeletePostUser } from "../../domain/use-cases/user/DeletePostUser";

@JsonController('/posts/users')
export class PostUserController {

    @Get('/')
    async getPostUsers(@Req() req: ContainerReq): Promise<any> {
        const { getPostUsersWithRatings } = req.container.cradle;
        return await getPostUsersWithRatings.execute();
    }

    @Get('/:id')
    async getPostUser(@Req() req: ContainerReq, @Param('id') id: string): Promise<IPostUser> {
        const { getPostUserById } = req.container.cradle;
        return await getPostUserById.execute(id);
    }

    @Post('/')
    async createPostUser(@Req() req: ContainerReq, @Body() userProps: IPostUser): Promise<IPostUser> {
        const { createPostUser } = req.container.cradle;
        return await createPostUser.execute(new PostUser(userProps));
    }

    @Patch('/:id')
    async updatePostUser(@Req() req: ContainerReq, @Body() updateProps: any, @Param('id') id: string): Promise<IPostUser> {
        const { updatePostUser } = req.container.cradle;
        return await updatePostUser.execute({ id, updateProps });
    }

    @Delete('/:id')
    async deletePostUser(@Req() req: ContainerReq, @Param('id') id: string): Promise<IPostUser> {
        const { deletePostUser }: {deletePostUser: DeletePostUser} = req.container.cradle;
        return await deletePostUser.execute(id);
    }

}
