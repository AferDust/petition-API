import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from "dotenv";

dotenv.config();

const ormConfig: TypeOrmModuleOptions = {
    type: "postgres",
    host: process.env.CLOUD_DATABASE_HOST,
    port: +process.env.PG_DATABASE_PORT,
    username: process.env.CLOUD_DATABASE_USERNAME,
    password: process.env.CLOUD_DATABASE_PASSWORD,
    database: process.env.CLOUD_DATABASE_NAME,
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
    synchronize: true,
};

export = ormConfig;