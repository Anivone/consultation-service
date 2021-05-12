import { IUseCase, UserUseCaseProps } from "../types";
import { IPostUserRepository } from "../../gateway/IUserRepository";
import { IUser } from "../../entities/types";
import to from "await-to-js";
import { DeleteRating } from "../rating/DeleteRating";
import { DeleteAccountByUserId } from "../account/DeleteAccountByUserId";

interface DeleteUserProps {
    deleteRating: DeleteRating;
    deleteAccountByUserId: DeleteAccountByUserId;
}

export class DeleteUser implements IUseCase<IUser> {

    userRepository: IPostUserRepository;
    deleteRating: DeleteRating;
    deleteAccountByUserId: DeleteAccountByUserId;

    constructor({ userRepository, deleteRating, deleteAccountByUserId }: UserUseCaseProps & DeleteUserProps) {
        this.userRepository = userRepository;
        this.deleteRating = deleteRating;
        this.deleteAccountByUserId = deleteAccountByUserId;
    }

    async execute(props: string): Promise<IUser> {
        const [err, user] = await to<IUser>(this.userRepository.getUserById(props));
        if (err) throw err;

        console.log('[X] DeleteUser user: ', user);

        const [err2, rating] = await to(this.deleteRating.execute(user.ratingID));
        if (err2) throw err2;

        console.log('[X] DeleteUser rating: ', rating);

        const [err3] = await to(this.deleteAccountByUserId.execute(user._id));
        if (err3) throw err3;

        const [err4] = await to(this.userRepository.deleteUser(user._id));
        if (err4) throw err4;

        return user;
    }

}