import { ExpressConfig } from "./ExpressConfig";
import * as mongoose from "mongoose";

export class Application {
    server: any;
    express: ExpressConfig;

    constructor(connection: mongoose.Connection) {
        this.express = new ExpressConfig(connection);
        const port = process.env.SPHERE_SERVICE_PORT;
        this.server = this.express.app.listen(port,
            () => console.log(`Server started ! Express: http://localhost:${port}`));
    }

}