import * as express from "express";
import * as path from "path";
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as cookieParser from "cookie-parser";
import { createProxyMiddleware } from 'http-proxy-middleware';
import { useExpressServer } from "routing-controllers";
import * as http from "http";
import JwtMiddleware from "../middleware/JwtMiddleware";

export class ExpressConfig {
    app: express.Express;

    jwtMiddleware: JwtMiddleware;

    constructor() {
        this.app = express();
        this.jwtMiddleware = new JwtMiddleware();

        this.app.use(cors());
        this.app.use(cookieParser());

        dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

        this.setUpControllers();
        this.setUpProxies();
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

        this.app.use('/auth',
            createProxyMiddleware('/auth', {
                target: `http://localhost:${process.env.USER_SERVICE_PORT}`,
                changeOrigin: true,
                cookieDomainRewrite: 'localhost',
                // onProxyRes(proxyRes: http.IncomingMessage) {
                //     const proxyAuth = proxyRes.headers.authorization;
                //     if (proxyAuth) {
                //         JwtMiddleware.token = proxyAuth.split(' ')[1];
                //     }
                // }
            }));

        this.app.use(this.jwtMiddleware.use);

        this.app.use('/posts/*',
            createProxyMiddleware('/posts', {
                target: `http://localhost:${process.env.POST_SERVICE_PORT}`,
                changeOrigin: true,
            }));

        this.app.use('/comments/*',
            createProxyMiddleware('/comments', {
                target: `http://localhost:${process.env.COMMENT_SERVICE_PORT}`,
                changeOrigin: true,
            }));

        this.app.use('/consultations/*',
            createProxyMiddleware('/consultations', {
                target: `http://localhost:${process.env.CONSULTATION_SERVICE_PORT}`,
                changeOrigin: true,
            }));

        this.app.use('/spheres/*',
            createProxyMiddleware('/spheres', {
                target: `http://localhost:${process.env.SPHERE_SERVICE_PORT}`,
                changeOrigin: true,
            }));

        this.app.use('/specialties/*',
            createProxyMiddleware('/specialties', {
                target: `http://localhost:${process.env.SPHERE_SERVICE_PORT}`,
                changeOrigin: true,
            }));

        this.app.use('/users/*',
            createProxyMiddleware('/users', {
                target: `http://localhost:${process.env.USER_SERVICE_PORT}`,
                changeOrigin: true,
            }));

    }

}