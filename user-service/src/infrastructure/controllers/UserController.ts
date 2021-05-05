import { Body, Controller, Delete, Get, Param, Patch, Post, Req } from "routing-controllers";
import { IUser } from "../../domain/entities/types";
import { User } from "../../domain/entities/User";
import { ContainerReq } from "../../config/Container";
import { IUserDocument } from "../../data/schemas/UserSchema";
import UserDTO from "../dto/UserDTO";

@Controller('/users')
export class UserController {

    @Get('/')
    async getUsers(@Req() req: ContainerReq): Promise<UserDTO[]> {
        const { getUsers } = req.container.cradle;
        const users: IUserDocument[] = await getUsers.execute();

        return users.map((user: IUserDocument) => user ? new UserDTO(user) : null);
    }

    @Get('/:id')
    async getUser(@Req() req: ContainerReq, @Param('id') id: string): Promise<UserDTO> {
        const { getUserById } = req.container.cradle;
        const user: IUserDocument = await getUserById.execute(id);

        return user ? new UserDTO(user) : null;
    }

    @Post('/')
    async createUser(@Req() req: ContainerReq, @Body() userProps: IUser): Promise<UserDTO> {
        const { createUser } = req.container.cradle;
        const user: IUserDocument = await createUser.execute(new User(userProps));

        return new UserDTO(user);
    }

    @Patch('/:id')
    async updateUser(@Req() req: ContainerReq, @Body() updateProps: any, @Param('id') id: string): Promise<UserDTO> {
        const { updateUser } = req.container.cradle;
        const user: IUserDocument = await updateUser.execute({ id, updateProps});

        return new UserDTO(user);
    }

    @Delete('/:id')
    async deleteUser(@Req() req: ContainerReq, @Param('id') id: string): Promise<UserDTO> {
        const { deleteUser } = req.container.cradle;
        const user: IUserDocument = await deleteUser.execute(id);

        return new UserDTO(user);
    }

}
