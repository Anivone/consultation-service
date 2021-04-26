export enum Status {
    POSTED = 'posted',
    DRAFT = 'draft',
}

export interface IComment {
    text: string;
    userID: string;
    postID: string;
    points: number;
    date: {
        day: number,
        month: number,
        year: number
    };
    status: Status;
}