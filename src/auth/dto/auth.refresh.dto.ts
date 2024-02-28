import { ApiProperty } from "@nestjs/swagger";
import { IsJWT } from "class-validator";

export class JwtRefreshDto {
    @ApiProperty()
    @IsJWT()
    refresh: string;
}
