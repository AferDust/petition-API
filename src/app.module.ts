import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
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
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
