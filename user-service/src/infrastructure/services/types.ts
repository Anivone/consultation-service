import { IUserAccount } from "../dto/IUserAccount";

export interface IUserService {

    authenticate(token: string): Promise<IUserAccount>

    signup(props: IUserAccount): Promise<IUserAccount>;

    login(email: string, password: string): Promise<IUserAccount>;

}