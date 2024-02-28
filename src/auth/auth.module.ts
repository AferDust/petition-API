import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import * as dotenv from "dotenv";
import { UserModule } from "../entities/users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AccessGuard } from "./guards/access.guard";
import { LocalStrategy } from "./strategies/local.strategies";

dotenv.config();

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: "5h" },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, AccessGuard, LocalStrategy],
    exports: [AuthService],
})
export class AuthModule { }

console.log(process.env.JWT_SECRET);

