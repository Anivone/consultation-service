import { IAccount } from "../domain/entities/types";
import { BehaviorSubject } from "rxjs";
import axios, { AxiosInstance } from "axios";
import { Account } from "../domain/entities/Account";
import to from "await-to-js";

export class AuthService {

    account: BehaviorSubject<IAccount | null>;

    constructor() {
        this.account = new BehaviorSubject<IAccount | null>(
            JSON.parse(localStorage.getItem('user') as string))
    }

    async authenticate(): Promise<IAccount | null> {
        const [err, response] = await to(axios.get('http://localhost:5000/auth/auth'));
        if (err) throw err;
        console.log('response: ', response!.data);

        const account = response!.data.user
            ? new Account(response!.data.user)
            : null;

        if (account) {
            this.account.next(account);
            localStorage.setItem('user', JSON.stringify(account));
        }

        return account;
    }

    async login(email: string, password: string): Promise<IAccount | null> {
        const [err, response] = await to(axios.post('http://localhost:5000/auth/login', {
            email,
            password
        }));
        if (err) throw err;

        console.log('response: ', response);

        const account = response!.data.user
            ? new Account(response!.data.user)
            : null;

        if (account) {
            this.account.next(account);
            localStorage.setItem('user', JSON.stringify(account));
        }

        return account;
    }

    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.account.next(null);
    }

}