import * as cors from "cors";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";
import { useExpressServer } from "routing-controllers";
import makeContainer from "./Container";
import * as awilix from 'awilix';
import { scopePerRequest } from "awilix-express";
import * as mongoose from "mongoose";
import { UserTagsController } from "../infrastructure/controllers/UserTagsController";
import { PostViewersController } from "../infrastructure/controllers/PostViewersController";
import { RecommendationController } from "../infrastructure/controllers/RecommendationController";

export class ExpressConfig {
    app: express.Express;
    container: awilix.AwilixContainer;

    constructor(connection: mongoose.Connection) {
        this.app = express();

        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));

        this.container = makeContainer(connection);
        this.app.use(scopePerRequest(this.container));

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
            controllers: [
                UserTagsController,
                PostViewersController,
                RecommendationController
            ]
        });

    }

}