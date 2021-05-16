import { IUseCase, ConsultUserUseCaseProps } from "../types";
import { IConsultUserRepository } from "../../gateway/IConsultUserRepository";
import { IConsultUser } from "../../entities/types";
import { GetConsultUsers } from "./GetConsultUsers";
import to from "await-to-js";

interface UpdateUseCase {
    id: string,
    updateProps: any,
}

interface UpdateConsultUserProps {
    getConsultUsers: GetConsultUsers;
}

export class UpdateConsultUser implements IUseCase<IConsultUser> {

    consultUserRepository: IConsultUserRepository;
    getConsultUsers: GetConsultUsers;

    constructor({ consultUserRepository, getConsultUsers }: ConsultUserUseCaseProps & UpdateConsultUserProps) {
        this.consultUserRepository = consultUserRepository;
        this.getConsultUsers = getConsultUsers;
    }

    async execute({ id, updateProps }: UpdateUseCase): Promise<IConsultUser> {
        const [err, users] = await to<IConsultUser[]>(this.getConsultUsers.execute({userID: id}));
        if (err) throw err;
        if (!users[0]) throw new Error('ConsultUser with such userID does not exist');

        return this.consultUserRepository.updateConsultUser(users[0]._id, updateProps);
    }

}