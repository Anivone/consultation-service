import { Controller, Get } from "routing-controllers";

@Controller('/test')
export class TestController {

    constructor() {}

    @Get('/')
    async get(): Promise<any> {
        return {
            msg: 'Post-Service TestController message'
        }
    }

}