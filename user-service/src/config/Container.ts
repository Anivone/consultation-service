import * as awilix from 'awilix';
import { AccountRepository } from "../data/repository/AccountRepository";
import * as mongoose from "mongoose";
import mongoModelsConfig from "./MongoConfig";

import { CreateAccount } from "../domain/use-cases/CreateAccount";
import { DeleteAccount } from "../domain/use-cases/DeleteAccount";
import { GetAccountById } from "../domain/use-cases/GetAccountById";
import { GetAccounts } from "../domain/use-cases/GetAccounts";
import { UpdateAccount } from "../domain/use-cases/UpdateAccount";

import { CreateUser } from "../domain/use-cases/CreateUser";
import { DeleteUser } from "../domain/use-cases/DeleteUser";
import { GetUserById } from "../domain/use-cases/GetUserById";
import { GetUsers } from "../domain/use-cases/GetUsers";
import { UpdateUser } from "../domain/use-cases/UpdateUser";
import { PromoteUser } from "../domain/use-cases/PromoteUser";
import { UserRepository } from "../data/repository/UserRepository";

export interface ContainerReq extends Request {
    container: awilix.AwilixContainer;
}

export default function makeContainer(connection: mongoose.Connection) {
    const container = awilix.createContainer();
    const { accountModel, userModel } = mongoModelsConfig(connection);

    container.register({

        //Other Values
        mongoConnection: awilix.asValue(connection),

        // Models
        AccountModel: awilix.asValue(accountModel),
        UserModel: awilix.asValue(userModel),

        // Repositories
        accountRepository: awilix.asClass(AccountRepository).singleton(),
        userRepository: awilix.asClass(UserRepository).singleton(),

        // Use-Cases
        createAccount: awilix.asClass(CreateAccount).singleton(),
        deleteAccount: awilix.asClass(DeleteAccount).singleton(),
        getAccountById: awilix.asClass(GetAccountById).singleton(),
        getAccounts: awilix.asClass(GetAccounts).singleton(),
        updateAccount: awilix.asClass(UpdateAccount).singleton(),

        createUser: awilix.asClass(CreateUser).singleton(),
        deleteUser: awilix.asClass(DeleteUser).singleton(),
        getUserById: awilix.asClass(GetUserById).singleton(),
        getUsers: awilix.asClass(GetUsers).singleton(),
        updateUser: awilix.asClass(UpdateUser).singleton(),
        promoteUser: awilix.asClass(PromoteUser).singleton(),

    })

    return container;
};