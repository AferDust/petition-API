import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../users/users.module';
import { VoteModule } from '../votes/votes.module';
import { PetitionController } from './petitions.controller';
import { Petition } from './petitions.entity';
import { PetitionService } from './petitions.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Petition]),
        UserModule,
        VoteModule
    ],
    controllers: [PetitionController],
    providers: [PetitionService],
    exports: [PetitionService],
})
export class PetitionModule { }
