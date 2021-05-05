import { IAccountDocument } from "../../data/schemas/AccountSchema";
import { Account } from "../../domain/entities/Account";

export default class AccountDTO extends Account{

    readonly _id: string;

    constructor(accountDocument: IAccountDocument) {
        super({
            email: accountDocument.email,
            password: accountDocument.password,
            userID: accountDocument.userID,
            role: accountDocument.role,
        });

        this._id = accountDocument._id.toString();
    }

}