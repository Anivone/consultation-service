import { IAccount, IUser, Role } from "../../domain/entities/types";

export interface IUserAccount extends Omit<IUser, '_id'>, Omit<IAccount, '_id'> {
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
    position?: string;
    consultationsNumber?: number;
    reviewsNumber?: number;
    ratingID?: string;
    email: string;
    password: string;
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
        this.position = props.position;
        this.consultationsNumber = props.consultationsNumber;
        this.reviewsNumber = props.reviewsNumber;
        this.ratingID = props.ratingID;
        this.email = props.email;
        this.password = props.password;
        this.userID = props.userID;
        this.role = props.role;
    }
}