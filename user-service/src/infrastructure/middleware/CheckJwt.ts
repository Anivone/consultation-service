import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import extractToken from "../tools/ExtractToken";

export async function checkJwt(req: Request, res: Response, next: NextFunction) {

    const token = extractToken(req);

    let jwtPayload: any;

    try {
        jwtPayload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        res.status(401).json({
            msg: 'You should be logged in to access this url'
        })
        return;
    }

    let data;
    if (typeof jwtPayload == 'object') {
        data = jwtPayload.data;
    } else {
        throw new Error('JwtToken has no payload');
    }

    const newToken = jwt.sign({
        data: { userID: data.userID, email: data.email, role: data.role }
    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

    res.setHeader('Authorization', 'Bearer ' + newToken);

    next();
}