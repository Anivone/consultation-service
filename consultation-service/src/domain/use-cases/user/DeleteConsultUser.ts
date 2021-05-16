import { IUseCase, ConsultUserUseCaseProps } from "../types";
import { IConsultUserRepository } from "../../gateway/IConsultUserRepository";
import { IConsultUser } from "../../entities/types";
import to from "await-to-js";
import { DeleteRating } from "../rating/DeleteRating";
import { GetConsultUsers } from "./GetConsultUsers";

interface DeleteConsultUserProps {
    getConsultUsers: GetConsultUsers;
    deleteRating: DeleteRating;
}

export class DeleteConsultUser implements IUseCase<IConsultUser> {

    consultUserRepository: IConsultUserRepository;
    deleteRating: DeleteRating;
    getConsultUsers: GetConsultUsers;

    constructor({ consultUserRepository, deleteRating, getConsultUsers }: ConsultUserUseCaseProps & DeleteConsultUserProps) {
        this.consultUserRepository = consultUserRepository;
        this.deleteRating = deleteRating;
        this.getConsultUsers = getConsultUsers;
    }

    async execute(userID: string): Promise<IConsultUser> {
        const [err, consultUsers] = await to<IConsultUser[]>(this.getConsultUsers.execute({userID}));
        if (err) throw err;
        if (!consultUsers[0]) throw new Error('ConsultUser with such userID does not exist');

        const consultUser = consultUsers[0];

        const [err2] = await to(this.deleteRating.execute(consultUser.ratingID));
        if (err2) throw err2;

        const [err3] = await to(this.consultUserRepository.deleteConsultUser(consultUser._id));
        if (err3) throw err3;

        return consultUser;
    }

}