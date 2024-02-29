import { ApiProperty } from "@nestjs/swagger";
import { IsInt, Validate } from "class-validator";
import { IsPetitionExists } from "../../../../common/validations/is-petition-exists.validation";

export class PetitionVoteActionDto {
    @ApiProperty()
    @IsInt()
    @Validate(IsPetitionExists)
    petitionId: number;
}
