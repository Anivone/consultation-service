import 'reflect-metadata';
import { Application } from "./config/Application";
import * as mongoose from "mongoose";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({path: path.resolve(__dirname, '../../.env')});

export default mongoose.createConnection(
    `mongodb://${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/${process.env.SPHERE_SERVICE_DB}`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        serverSelectionTimeoutMS: 5000
    },
    (err, conn) => {
        if(err) throw new Error(err.message);

        new Application(conn);
    }
)