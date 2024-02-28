import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class SignInDto {
    @ApiProperty()
    @IsString()
    @MinLength(4)
    login: string;

    @ApiProperty()
    @IsString()
    password: string;
}
