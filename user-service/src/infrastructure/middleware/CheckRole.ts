import * as jwt from 'jsonwebtoken';
import { Action } from "routing-controllers";
import { ContainerReq } from "../../config/Container";
import to from "await-to-js";
import { IAccount } from "../../domain/entities/types";
import { GetAccounts } from "../../domain/use-cases/account/GetAccounts";
import extractToken from "../tools/ExtractToken";

interface checkRoleProps {
    getAccounts: GetAccounts
}

export async function checkRole(action: Action, roles: string[]) {
    const req: ContainerReq = action.request;

    const token = extractToken(req);

    if (!token) return false;

    const jwtPayload: any = jwt.verify(token, process.env.JWT_SECRET);
    const userID = jwtPayload.data.userID;

    const { getAccounts }: checkRoleProps = req.container.cradle;
    const [err, accounts] = await to<IAccount[]>(getAccounts.execute({userID}));

    if (err || !accounts[0]) return false;
    const account = accounts[0];

    return roles.indexOf(account.role) > -1;
}