export interface ISphere {
    _id?: string;
    name: string;
    specialties?: ISpecialty[];
    tags?: string[];
}

export interface ISpecialty {
    _id?: string;
    name: string;
    consultationsNumber?: number;
    postsNumber?: number;
}