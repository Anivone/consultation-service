import { ExpressConfig } from "./ExpressConfig";

export class Application {
    server: any;
    express: ExpressConfig;

    constructor() {
        this.express = new ExpressConfig();
        const port = process.env.POST_SERVICE_PORT;
        this.server = this.express.app.listen(port,
            () => console.log(`Server started ! Express: http://localhost:${port}`));
    }

}