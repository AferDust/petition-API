import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../users/users.module';
import { VoteModule } from '../votes/votes.module';
import { PetitionAdminController } from './petition.admin.controller';
import { PetitionAdminService } from './petition.admin.service';
import { PetitionController } from './petitions.controller';
import { Petition } from './petitions.entity';
import { PetitionService } from './petitions.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Petition]),
        UserModule,
        VoteModule
    ],
    controllers: [PetitionController, PetitionAdminController],
    providers: [PetitionService, PetitionAdminService],
    exports: [PetitionService],
})
export class PetitionModule { }
