import {
    Authorized,
    Body,
    Delete,
    Get,
    JsonController,
    Param,
    Patch,
    Post,
    Req, UseBefore
} from "routing-controllers";
import { IRating, IUser, Role } from "../../domain/entities/types";
import { User } from "../../domain/entities/User";
import { ContainerReq } from "../../config/Container";
import { DeleteUser } from "../../domain/use-cases/user/DeleteUser";

// @Authorized([Role.Consultant])
@JsonController('/users')
export class UserController {

    @Get('/')
    async getUsers(@Req() req: ContainerReq): Promise<IUser[]> {
        const { getUsers } = req.container.cradle;
        return await getUsers.execute();
    }

    @Get('/:id')
    async getUser(@Req() req: ContainerReq, @Param('id') id: string): Promise<IUser> {
        const { getUserById } = req.container.cradle;
        return await getUserById.execute(id);
    }

    @Post('/')
    async createUser(@Req() req: ContainerReq, @Body() userProps: IUser): Promise<IUser> {
        const { createUser } = req.container.cradle;
        return await createUser.execute(userProps);
    }

    @Post('/:id/vote')
    async voteRating(@Req() req: ContainerReq, @Param('id') id: string, @Body() body: any): Promise<IRating> {
        const { userService } = req.container.cradle;
        return await userService.vote(id, body.vote);
    }

    @Patch('/:id/promote')
    async promoteUser(@Req() req: ContainerReq, @Param('id') id: string, @Body() body: any): Promise<IUser> {
        const { userService } = req.container.cradle;
        return await userService.promote(id, body);
    }

    @Patch('/:id')
    async updateUser(@Req() req: ContainerReq, @Body() updateProps: any, @Param('id') id: string): Promise<IUser> {
        const { updateUser } = req.container.cradle;
        return await updateUser.execute({ id, updateProps });
    }

    @Delete('/:id')
    async deleteUser(@Req() req: ContainerReq, @Param('id') id: string): Promise<IUser> {
        const { userService } = req.container.cradle;
        return await userService.delete(id);
    }


}
