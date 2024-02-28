import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { Petition } from 'src/entities/petitions/petitions.entity';
import { User } from 'src/entities/users/users.entity';

export class VoteCreateDto {
    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    user: User;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    petition: Petition;
}