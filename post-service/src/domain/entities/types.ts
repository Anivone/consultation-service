export enum Status {
    ACTIVE = 'active',
    DRAFT = 'draft',
    CLOSED = 'closed'
}

export interface IPost {
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
    sphereID: string,
    specialty: string,
    status: Status,
    edited: boolean
}