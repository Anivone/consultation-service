export interface IConsultation {
    title: string;
    userID: string;
    consultantID: string;
    specialtyID: string;
    companyName?: string;
    description: string;
    price: number;
}

export interface IConsultUser {
    _id?: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    phoneNumber: string;
    isConsultant: boolean;
    specialtyID?: string;
    consultationsNumber?: number;
    reviewsNumber?: number;
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

export interface ISpecialty {
    _id?: string;
    name: string;
}
