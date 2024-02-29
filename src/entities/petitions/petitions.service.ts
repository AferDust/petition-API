import { Injectable, NotFoundException } from '@nestjs/common';
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

    async findAll(sorting: "ASC" | "DESC"): Promise<Petition[]> {
        if (!sorting)
            return this.petitionRepository.find({
                relations: {
                    votes: true,
                }
            });

        return this.petitionRepository
            .createQueryBuilder('petition')
            .leftJoinAndSelect('petition.votes', 'votes')
            .groupBy('petition.id, votes.id')
            .orderBy('COUNT(votes.id)', sorting)
            .getMany();

    }

    async findOne(id: number): Promise<Petition> {
        const instance: Petition = await this.petitionRepository.findOne({
            where: { id },
            relations: {
                votes: { user: true },
            }
        });
        this.isNotExists(instance, id);

        return instance;
    }

    async findAllVotedPetitionsOfUser(userId: number): Promise<Petition[]> {
        const petitions: Petition[] = await this.petitionRepository.createQueryBuilder('petition')
            .leftJoinAndSelect('petition.votes', 'vote')
            .innerJoin('vote.user', 'user')
            .where('user.id = :userId', { userId })
            .getMany();

        return petitions;
    }

    async giveVote(id: number, userId: number) {
        const user: User = await this.userService.findOneById(userId);

        const instance: Petition = await this.petitionRepository.findOne({ where: { id } });
        this.isNotExists(instance, id);

        return this.voteService.giveVote(user, instance);
    }

    async removeVote(id: number, userId: number) {
        return this.voteService.removeVote(id, userId);
    }


    async findFilteredPetitionsByDate(startDate?: Date): Promise<Petition[]> {
        let query = this.petitionRepository.createQueryBuilder('petition')
            .leftJoinAndSelect('petition.votes', 'votes')
            .andWhere('petition.createdDate >= :startDate', { startDate });

        return await query.getMany();
    }

    async findPetitionsWithMoreVotes(minVotes: number): Promise<Petition[]> {
        return await this.petitionRepository
            .createQueryBuilder('petition')
            .leftJoinAndSelect('petition.votes', 'votes')
            .groupBy('petition.id, votes.id')
            .having('COUNT(votes.id) >= :minVotes', { minVotes })
            .getMany();
    }

    isNotExists(instance: Petition, id: number) {
        if (!instance)
            throw new NotFoundException(`Petition with ID ${id} not found`);

    }
}