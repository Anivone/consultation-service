import { Controller, Get } from "routing-controllers";

@Controller()
export class TestController {

    @Get('/')
    async get(): Promise<any> {
        return {
            msg: 'This is my first microservice - API Gateway !'
        }
    }

}