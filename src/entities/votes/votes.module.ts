import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './votes.entity';
import { VoteService } from './votes.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Vote]),
    ],
    controllers: [],
    providers: [VoteService],
    exports: [VoteService],
})
export class VoteModule { }
