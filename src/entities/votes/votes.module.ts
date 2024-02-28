import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './votes.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Vote]),
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class VotesModule { }
