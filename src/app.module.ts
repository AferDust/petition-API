import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ValidatorModule } from './common/validations/validator.module';
import { DatabaseModule } from './database/database.module';
import { PetitionModule } from './entities/petitions/petitions.module';
import { UserModule } from './entities/users/users.module';
import { VoteModule } from './entities/votes/votes.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    VoteModule,
    UserModule,
    PetitionModule,
    ValidatorModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
