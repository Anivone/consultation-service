export enum Role {
    User = 'user',
    Consultant = 'consultant'
}

export interface IAccount {
    email: string;
    password: string;
    userID: string;
    role: Role;
}

export interface IUser {
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
}