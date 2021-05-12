import { IUseCase, UserUseCaseProps } from "../types";
import { IRating, IUser } from "../../entities/types";
import { IPostUserRepository } from "../../gateway/IUserRepository";
import { CreateRating } from "../rating/CreateRating";
import to from "await-to-js";

interface CreateUserProps {
    userRepository: IPostUserRepository;
    createRating: CreateRating;
}

export class CreateUser implements IUseCase<IUser> {

    private userRepository: IPostUserRepository;
    private createRating: CreateRating;

    constructor({ userRepository, createRating }: UserUseCaseProps & CreateUserProps) {
        this.userRepository = userRepository;
        this.createRating = createRating;
    }

    async execute(props: IUser): Promise<IUser> {
        const [err, user] = await to<IUser>(this.userRepository.createUser(props));
        if (err) throw err;

        const [err2, rating] = await to<IRating>(this.createRating.execute({}));
        if (err2) throw err2;

        const [err3, newUser] = await to<IUser>(
            this.userRepository.updateUser(user._id, {ratingID: rating._id}));
        if (err3) throw err3;

        return newUser;
    }

}