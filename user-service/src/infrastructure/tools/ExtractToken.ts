import { Request } from "express";

export default function extractToken(req: Request) {
    const authorization = req.headers.authorization;
    if (authorization
        && authorization.split(' ')[0] === 'Bearer') {
        return authorization.split(' ')[1];
    }
}
