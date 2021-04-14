import * as cors from "cors";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";
import * as dotenv from 'dotenv';
import { useExpressServer } from "routing-controllers";
import makeContainer, { ContainerReq } from "./Container";
import * as awilix from 'awilix';
import { scopePerRequest } from "awilix-express";

export class ExpressConfig {
    app: express.Express;
    container: awilix.AwilixContainer;

    constructor() {
        this.app = express();

        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));

        this.container = makeContainer();
        this.app.use(scopePerRequest(this.container));

        dotenv.config({path: path.resolve(__dirname, '../../../.env')});

        this.setUpControllers();
    }

    setUpControllers() {
        const env = process.env.ENVIRONMENT;
        const controllerPath =
            env === 'PROD'
                ? path.resolve('dist', 'infrastructure', 'controllers')
                : path.resolve('src', 'infrastructure', 'controllers');

        const extension = env === 'PROD' ? '/*.js' : '/*.ts';

        useExpressServer(this.app, {
            controllers: [controllerPath + extension]
        });

    }

}