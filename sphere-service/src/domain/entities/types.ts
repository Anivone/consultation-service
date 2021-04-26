export type Specialty = {
    name: string;
    consultationsNumber: number;
    postsNumber: number;
}

export interface ISphere {
    name: string;
    specialties: Specialty[];
}