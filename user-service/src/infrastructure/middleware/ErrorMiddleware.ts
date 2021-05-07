import { ExpressErrorMiddlewareInterface, Middleware } from "routing-controllers";
import { Request, Response } from "express";

@Middleware({ type: 'after' })
export class ErrorMiddleware implements ExpressErrorMiddlewareInterface {
    error(error: any, request: Request, response: Response, next: (err?: any) => any) {
        if (error) {
            if (response.headersSent) {
                return response.end();
            }
            return response.json(error);
        }

        return next();
    }

}