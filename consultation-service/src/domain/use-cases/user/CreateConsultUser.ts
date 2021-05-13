import { IUseCase, ConsultUserUseCaseProps } from "../types";
import { IConsultUser, IRating } from "../../entities/types";
import { IConsultUserRepository } from "../../gateway/IConsultUserRepository";
import to from "await-to-js";
import { CreateRating } from "../rating/CreateRating";

interface CreateConsultUserProps {
    createRating: CreateRating;
}

export class CreateConsultUser implements IUseCase<IConsultUser> {

    private consultUserRepository: IConsultUserRepository;
    private createRating: CreateRating;

    constructor({ consultUserRepository, createRating }: ConsultUserUseCaseProps & CreateConsultUserProps) {
        this.consultUserRepository = consultUserRepository;
        this.createRating = createRating;
    }

    async execute(props: IConsultUser): Promise<IConsultUser> {
        const [err, consultUser] = await to<IConsultUser>(this.consultUserRepository.createConsultUser(props));
        if (err) throw err;

        const [err2, rating] = await to<IRating>(this.createRating.execute({}));
        if (err2) throw err2;

        const [err3, newConsultUser] = await to<IConsultUser>(
            this.consultUserRepository.updateConsultUser(consultUser._id, {ratingID: rating._id}));
        if (err3) throw err3;

        return newConsultUser;
    }

}