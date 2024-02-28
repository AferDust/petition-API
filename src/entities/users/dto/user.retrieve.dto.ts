import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UserRetrieveDto {
    @ApiProperty()
    @IsString()
    login: string;
}
