import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsInt, ValidateNested } from "class-validator";
import { UserRetrieveDto } from "src/entities/users/dto";

export class VoteRetrieveDto {
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty()
    @IsDate()
    dateTime: Date;

    @ApiProperty()
    @ValidateNested()
    @Type(() => UserRetrieveDto)
    user: UserRetrieveDto;
}

