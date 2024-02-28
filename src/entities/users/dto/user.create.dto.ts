import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class UserCreateDto {
    @ApiProperty()
    @IsString()
    @MinLength(4)
    login: string;

    @ApiProperty()
    @IsString()
    @MinLength(8)
    password: string;
}
