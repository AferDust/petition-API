import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class PetitionAdminCreateDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    description: string;
}
