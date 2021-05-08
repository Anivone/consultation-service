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
import { IUser, Role } from "../../domain/entities/types";
import { User } from "../../domain/entities/User";
import { ContainerReq } from "../../config/Container";
import { DeleteUser } from "../../domain/use-cases/user/DeleteUser";

@Authorized([Role.Consultant])
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
        return await createUser.execute(new User(userProps));
    }

    @Patch('/:id')
    async updateUser(@Req() req: ContainerReq, @Body() updateProps: any, @Param('id') id: string): Promise<IUser> {
        const { updateUser } = req.container.cradle;
        return await updateUser.execute({ id, updateProps });
    }

    @Delete('/:id')
    async deleteUser(@Req() req: ContainerReq, @Param('id') id: string): Promise<IUser> {
        const { deleteUser }: {deleteUser: DeleteUser} = req.container.cradle;
        return await deleteUser.execute(id);
    }

}
