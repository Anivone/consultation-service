import * as awilix from 'awilix';
import * as mongoose from "mongoose";
import { Request } from 'express';
import mongoModelsConfig from "./MongoConfig";

import { AccountRepository } from "../data/repository/AccountRepository";
import { UserRepository } from "../data/repository/UserRepository";

import { CreateAccount } from "../domain/use-cases/account/CreateAccount";
import { DeleteAccount } from "../domain/use-cases/account/DeleteAccount";
import { GetAccountById } from "../domain/use-cases/account/GetAccountById";
import { GetAccounts } from "../domain/use-cases/account/GetAccounts";
import { UpdateAccount } from "../domain/use-cases/account/UpdateAccount";

import { CreateUser } from "../domain/use-cases/user/CreateUser";
import { DeleteUser } from "../domain/use-cases/user/DeleteUser";
import { GetUserById } from "../domain/use-cases/user/GetUserById";
import { GetUsers } from "../domain/use-cases/user/GetUsers";
import { UpdateUser } from "../domain/use-cases/user/UpdateUser";
import { PromoteUser } from "../domain/use-cases/user/PromoteUser";
import { UserService } from "../infrastructure/services/UserService";

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

        // Services
        userService: awilix.asClass(UserService).singleton(),

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