import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { Petition } from '../petitions/petitions.entity';
import { User } from '../users/users.entity';
import { VoteCreateDto } from './dto/vote.create.dto';
import { Vote } from './votes.entity';


@Injectable()
export class VoteService {
    constructor(
        @InjectRepository(Vote)
        private readonly voteRepository: Repository<Vote>,
    ) { }

    async create(createDto: VoteCreateDto): Promise<Vote> {
        const instance: Vote = this.voteRepository.create(createDto);
        return this.voteRepository.save(instance);
    }

    async giveVote(user: User, petition: Petition) {
        const instance: Vote = await this.voteRepository.findOne({
            where: {
                user: { id: user.id },
                petition: { id: petition.id }
            }
        });
        this.isExists(instance);


        return this.create({ user: user, petition: petition });
    }


    async removeVote(petitionId: number, userId: number) {
        const instance: Vote = await this.voteRepository.findOne({
            where: {
                user: { id: userId },
                petition: { id: petitionId }
            }
        });
        this.isNotExists(instance);

        await this.voteRepository.remove(instance);
        return "Ok";
    }


    isExists(instance: Vote) {
        if (instance)
            throw new BadRequestException("You already give vote to this petition");
    }

    isNotExists(instance: Vote) {
        if (!instance)
            throw new BadRequestException("You can't remove your vote because you haven't given yet");
    }

}