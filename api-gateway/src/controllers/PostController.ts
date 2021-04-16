import { Body, Controller, Delete, Get, Param, Patch, Post } from "routing-controllers";
import axios from "axios";

@Controller('/posts')
export class PostController {

    @Get('/')
    async getPosts() {
        const response = await axios.get('http://localhost:5001/posts');

        return response.data;
    }

    @Get('/:id')
    async getPost(@Param('id') id: string) {
        const response = await axios.get('http://localhost:5001/posts/' + id);

        return response.data;
    }

    @Post('/')
    async createPost(@Body() postProps: any): Promise<any> {
        const response = await axios.post('http://localhost:5001/posts', postProps);

        return response.data;
    }

    @Patch('/:id')
    async updatePost(@Param('id') id: string, @Body() updateProps: any) {
        const response = await axios.patch('http://localhost:5001/posts/' + id, updateProps);

        return response.data;
    }

    @Delete('/:id')
    async deletePost(@Param('id') id: string) {
        const response = await axios.delete('http://localhost:5001/posts/' + id);

        return response.data;
    }

}