export enum Status {
    ACTIVE = 'active',
    CLOSED = 'closed'
}

export interface IPost {
    _id?: string;
    title: string,
    description: string,
    userID: string,
    relevance: number,
    tags: string[],
    date: {
        day: number,
        month: number,
        year: number
    },
    views: number,
    specialty: string,
    status: Status,
    edited: boolean
}

export interface IComment {
    _id?: string;
    text: string;
    userID: string;
    postID: string;
    points?: number;
    date: {
        day: number,
        month: number,
        year: number
    };
}

export interface IPostUser {
    _id?: string;
    userID: string;
    firstName: string;
    lastName: string;
    isConsultant: boolean;
    specialtyID?: string;
    ratingID?: string;
}

export interface IRating {
    _id?: string;
    one?: number;
    two?: number;
    three?: number;
    four?: number;
    five?: number;
}