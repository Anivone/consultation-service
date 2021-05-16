import { IAccount, IUser, Role } from "../../domain/entities/types";

export interface IUserAccount extends Omit<IUser, '_id'>, Omit<Omit<IAccount, '_id'>, 'password'> {
    password?: string;
}

export class UserAccount {
    firstName: string;
    lastName: string;
    middleName?: string;
    phoneNumber: string;
    location: {
        country: string,
        city: string
    };
    description: string;
    posts: number;
    comments: number;
    isConsultant: boolean;
    specialtyID?: string;
    consultationsNumber?: number;
    ratingID?: string;
    email: string;
    userID: string;
    role: Role;

    constructor(props: IUserAccount) {
        this.firstName = props.firstName;
        this.lastName = props.lastName;
        this.middleName = props.middleName;
        this.phoneNumber = props.phoneNumber;
        this.location = props.location;
        this.description = props.description;
        this.posts = props.posts;
        this.comments = props.comments;
        this.isConsultant = props.isConsultant;
        this.specialtyID = props.specialtyID;
        this.consultationsNumber = props.consultationsNumber;
        this.ratingID = props.ratingID;
        this.email = props.email;
        this.userID = props.userID;
        this.role = props.role;
    }
}