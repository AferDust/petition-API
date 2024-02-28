import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Petition } from './petitions.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Petition]),
    ],
    controllers: [],
    providers: [],
    exports: [],
})
export class PetitionsModule { }
