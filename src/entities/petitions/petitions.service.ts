import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { UserService } from '../users/user.service';
import { User } from '../users/users.entity';
import { VoteService } from '../votes/votes.service';
import { Petition } from './petitions.entity';


@Injectable()
export class PetitionService {
    constructor(
        @InjectRepository(Petition)
        private readonly petitionRepository: Repository<Petition>,
        private readonly userService: UserService,
        private readonly voteService: VoteService
    ) { }

    async findAll(): Promise<Petition[]> {
        return this.petitionRepository.find({
            relations: {
                votes: true,
            }
        });
    }

    async findOne(id: number): Promise<Petition> {
        return this.petitionRepository.findOne({
            where: { id },
            relations: {
                votes: { user: true },
            }
        });
    }

    async findAllVotedPetitions(userId: number): Promise<Petition[]> {
        const petitions: Petition[] = await this.petitionRepository.createQueryBuilder('petition')
            .innerJoin('petition.votes', 'vote')
            .innerJoin('vote.user', 'user')
            .where('user.id = :userId', { userId })
            .getMany();

        return petitions;
    }

    async giveVote(id: number, userId: number) {
        const user: User = await this.userService.findOneById(userId);
        const instance: Petition = await this.petitionRepository.findOne({ where: { id } });

        return this.voteService.giveVote(user, instance);
    }

    async removeVote(id: number, userId: number) {
        return this.voteService.removeVote(id, userId);
    }

}