import * as express from "express";
import * as path from "path";
import * as dotenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { useExpressServer } from "routing-controllers";

export class ExpressConfig {
    app: express.Express;

    constructor() {
        this.app = express();

        this.app.use('/posts',
            createProxyMiddleware('/posts', {
                target: 'http://localhost:5001',
                changeOrigin: true,
            }));

        dotenv.config({path: path.resolve(__dirname, '../../../.env')});

        this.setUpControllers();
    }

    setUpControllers() {
        const env = process.env.ENVIRONMENT;
        const controllerPath =
            env === 'PROD'
                ? path.resolve('dist', 'controllers')
                : path.resolve('src', 'controllers');

        const extension = env === 'PROD' ? '/*.js' : '/*.ts';

        useExpressServer(this.app, {
            controllers: [controllerPath + extension]
        });
    }

}