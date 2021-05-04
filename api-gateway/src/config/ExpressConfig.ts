import * as express from "express";
import * as path from "path";
import * as dotenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { useExpressServer } from "routing-controllers";

export class ExpressConfig {
    app: express.Express;

    constructor() {
        this.app = express();

        dotenv.config({path: path.resolve(__dirname, '../../../.env')});

        this.setUpProxies();
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

    setUpProxies() {
        this.app.use('/posts',
            createProxyMiddleware('/posts', {
                target: `http://localhost:${process.env.POST_SERVICE_PORT}`,
                changeOrigin: true,
            }));

        this.app.use('/comments',
            createProxyMiddleware('/comments', {
                target: `http://localhost:${process.env.COMMENT_SERVICE_PORT}`,
                changeOrigin: true,
            }));

        this.app.use('/consultations',
            createProxyMiddleware('/consultations', {
                target: `http://localhost:${process.env.CONSULTATION_SERVICE_PORT}`,
                changeOrigin: true,
            }));

        this.app.use('/spheres',
            createProxyMiddleware('/spheres', {
                target: `http://localhost:${process.env.SPHERE_SERVICE_PORT}`,
                changeOrigin: true,
            }));

        this.app.use('/specialties',
            createProxyMiddleware('/specialties', {
                target: `http://localhost:${process.env.SPHERE_SERVICE_PORT}`,
                changeOrigin: true,
            }));
    }

}