import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { PetitionsModule } from './entities/petitions/petitions.module';
import { UserModule } from './entities/users/users.module';
import { VotesModule } from './entities/votes/votes.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    PetitionsModule,
    VotesModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
