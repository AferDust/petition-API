import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { PetitionsModule } from './entities/petitions/petitions.module';
import { UsersModule } from './entities/users/users.module';
import { VotesModule } from './entities/votes/votes.module';

@Module({
  imports: [
    DatabaseModule,
    PetitionsModule,
    VotesModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
