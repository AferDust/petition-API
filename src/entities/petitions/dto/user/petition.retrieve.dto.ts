import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsInt, IsString, ValidateNested } from "class-validator";
import { VoteRetrieveDto } from "src/entities/votes/dto/vote.retrieve.dto";

export class PetitionRetrieveDto {
    @ApiProperty()
    @IsInt()
    id: number;

    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsDate()
    createDate: Date;

    @ApiProperty()
    @IsInt()
    votesNumber: number;

    @ApiProperty()
    @ValidateNested()
    @Type(() => VoteRetrieveDto)
    votes: VoteRetrieveDto[]
}
