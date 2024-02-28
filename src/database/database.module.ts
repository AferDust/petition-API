import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from "dotenv";

dotenv.config();

const config: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.CLOUD_DATABASE_HOST,
    port: +process.env.PG_DATABASE_PORT,
    username: process.env.CLOUD_DATABASE_USERNAME,
    password: process.env.CLOUD_DATABASE_PASSWORD,
    database: process.env.CLOUD_DATABASE_NAME,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
};


@Module({
    imports: [TypeOrmModule.forRoot(config)],
})
export class DatabaseModule { }

console.log(process.env.CLOUD_DATABASE_NAME)
console.log(config.entities);