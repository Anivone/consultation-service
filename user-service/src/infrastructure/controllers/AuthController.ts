import { Body, JsonController, Post, Req, Res } from "routing-controllers";
import { ContainerReq } from "../../config/Container";
import { UserAccount } from "../services/types";
import { generateJwtToken } from "../tools/JwtToken";
import to from "await-to-js";
import { Response } from "express";

@JsonController('/auth')
export class AuthController {

    @Post('/login')
    async login(@Req() req: ContainerReq, @Res() res: Response, @Body() body: any): Promise<any> {
        const { userService } = req.container.cradle;
        const [err, user] = await to<UserAccount>(userService.login(body.email, body.password))

        if (err) throw err;

        const token = generateJwtToken({
            email: user.email,
            userID: user.userID,
            role: user.role
        });

        res.setHeader('Authorization', 'Bearer ' + token);

        return {
            message: 'User has successfully logged in',
            user,
            token
        }
    }

    @Post('/signup')
    async signup(@Req() req: ContainerReq, @Res() res: Response, @Body() body: any): Promise<any> {
        const { userService } = req.container.cradle;
        const [err, user] = await to<UserAccount>(userService.signup(req.body));

        if (err) throw err;

        const token = generateJwtToken({
            email: user.email,
            userID: user.userID,
            role: user.role
        });

        res.setHeader('Authorization', 'Bearer ' + token);

        return {
            message: 'User has successfully signed up',
            user,
            token
        }
    }

}