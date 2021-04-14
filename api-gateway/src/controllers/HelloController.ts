import { Controller, Get, Post, Req, Res } from "routing-controllers";
import { Request, Response } from "express";
import axios from "axios";

@Controller()
export class HelloController {

    @Get('/posts')
    async getPosts(@Res() res: Response): Promise<any> {
        const response = await axios.get('http://localhost:5001/posts');

        return response.data;
    }

    @Get('/')
    async get(): Promise<any> {
        return {
            msg: 'This is my first microservice - API Gateway !'
        }
    }

    @Post('/posts')
    async createPost(@Req() req: Request): Promise<any> {
        const response = await axios.post('http://localhost:5001/posts', req.body);

        return response.data;
    }

}