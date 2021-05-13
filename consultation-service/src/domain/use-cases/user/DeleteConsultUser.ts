import { IUseCase, ConsultUserUseCaseProps } from "../types";
import { IConsultUserRepository } from "../../gateway/IConsultUserRepository";
import { IConsultUser } from "../../entities/types";
import to from "await-to-js";
import { DeleteRating } from "../rating/DeleteRating";

interface DeleteConsultUserProps {
    deleteRating: DeleteRating;
}

export class DeleteConsultUser implements IUseCase<IConsultUser> {

    consultUserRepository: IConsultUserRepository;
    deleteRating: DeleteRating;

    constructor({ consultUserRepository, deleteRating }: ConsultUserUseCaseProps & DeleteConsultUserProps) {
        this.consultUserRepository = consultUserRepository;
        this.deleteRating = deleteRating;
    }

    async execute(props: string): Promise<IConsultUser> {
        const [err, consultUser] = await to<IConsultUser>(this.consultUserRepository.getConsultUserById(props));
        if (err) throw err;

        const [err2] = await to(this.deleteRating.execute(consultUser.ratingID));
        if (err2) throw err2;

        const [err3] = await to(this.consultUserRepository.deleteConsultUser(consultUser._id));
        if (err3) throw err3;

        return consultUser;
    }

}