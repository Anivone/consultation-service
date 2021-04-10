import * as cors from "cors";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";
import * as dotenv from 'dotenv';
import { useExpressServer } from "routing-controllers";

export class ExpressConfig {
    app: express.Express;

    constructor() {
        this.app = express();
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
        dotenv.config({path: path.resolve(__dirname, '../../../.env')});

        this.setUpControllers();
    }

    setUpControllers() {
        const env = process.env.ENVIRONMENT;
        const controllerPath =
            env === 'DEV'
                ? path.resolve('src', 'controllers')
                : path.resolve('dist', 'controllers');

        const extension = env === 'DEV' ? '/*.ts' : '/*.js';

        useExpressServer(this.app, {
            controllers: [controllerPath + extension]
        });
    }

}