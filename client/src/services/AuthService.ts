import { BehaviorSubject } from "rxjs";
import axios  from "axios";
import to from "await-to-js";
import { RegistrationPageState } from "../components/registration/RegistrationPage";
import { IUserAccount, UserAccount } from "../domain/entities/IUserAccount";
import { Account } from "../domain/entities/Account";

export class AuthService {

    account: BehaviorSubject<IUserAccount | null>;

    constructor() {
        this.account = new BehaviorSubject<IUserAccount | null>(
            JSON.parse(localStorage.getItem('user') as string))
    }

    async authenticate(): Promise<IUserAccount | null> {
        const [err, response] = await to(axios.get('http://localhost:5000/auth/auth'));
        if (err) {
            this.account.next(null);
            return null;
        }
        const account = response!.data.user
            ? new UserAccount(response!.data.user)
            : null;

        if (account) {
            this.account.next(account);
            localStorage.setItem('user', JSON.stringify({
                firstName: account.firstName,
                lastName: account.lastName,
                userID: account.userID,
                email: account.email,
                role: account.role,
            }));
        } else {
            this.account.next(null);
        }

        return account;
    }

    async login(email: string, password: string): Promise<IUserAccount | null> {
        const [err, response] = await to(axios.post('http://localhost:5000/auth/login', {
            email,
            password
        }));
        if (err) throw err;

        const account = response!.data.user
            ? new UserAccount(response!.data.user)
            : null;

        if (account) {
            this.account.next(account);
            localStorage.setItem('user', JSON.stringify({
                firstName: account.firstName,
                lastName: account.lastName,
                userID: account.userID,
                email: account.email,
                role: account.role,
            }));
        }

        return account;
    }

    async register(props: RegistrationPageState) {
        console.log('props: ', props);
        const [err, userAccount] = await to<any>(axios.post('http://localhost:5000/auth/signup', {
            ...props,
            description: '',
            posts: 0,
            comments: 0,
            consultationsNumber: 0,
            location: {
                country: props.country,
                city: props.city,
            }
        }));
        if (err) throw err;
        if (!userAccount) throw new Error('Registration server error');

        this.account.next(userAccount);
        localStorage.setItem('user', JSON.stringify({
            email: userAccount.email,
            userID: userAccount.userID,
            role: userAccount.role,
        }))

        return userAccount;
    }

    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.account.next(null);
    }

}