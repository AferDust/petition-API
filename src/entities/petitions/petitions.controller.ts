import { Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AccessGuard } from "../../auth/guards/access.guard";
import { PetitionListDto, PetitionRetrieveDto } from "./dto/user";
import { PetitionVoteActionDto } from "./dto/user/petition.vote.action.dto";
import { Petition } from "./petitions.entity";
import { PetitionService } from "./petitions.service";

@ApiTags("Petition")
@Controller("petition")
export class PetitionController {
    constructor(
        private readonly petitionService: PetitionService
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<PetitionListDto[]> {
        const petitions: Petition[] = await this.petitionService.findAll();
        return this.mapInstancesToDto(petitions);
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    async findOne(
        @Param("id", ParseIntPipe) id: number,
    ): Promise<PetitionRetrieveDto> {
        const petition: Petition = await this.petitionService.findOne(id);

        const votes = petition.votes.map(vote => ({
            id: vote.id,
            dateTime: vote.dateTime,
            user: {
                login: vote.user.login,
            },
        }));

        const petitionRetrieveDto: PetitionRetrieveDto = {
            id: petition.id,
            name: petition.name,
            description: petition.description,
            createDate: petition.createdDate,
            votesNumber: votes.length,
            votes: votes,
        };

        return petitionRetrieveDto;
    }

    @Get('all-voted-petitions')
    @HttpCode(HttpStatus.ACCEPTED)
    @ApiBearerAuth()
    @UseGuards(AccessGuard)
    async allVotedPetitions(@Request() request): Promise<PetitionListDto[]> {
        const petitions: Petition[] = await this.petitionService.findAllVotedPetitions(request.user.pk);
        return this.mapInstancesToDto(petitions);
    }

    @Post("vote/give")
    @HttpCode(HttpStatus.ACCEPTED)
    @ApiBearerAuth()
    @UseGuards(AccessGuard)
    async giveVote(
        petitionVoteActionDto: PetitionVoteActionDto,
        @Request() request
    ) {
        return this.petitionService.giveVote(petitionVoteActionDto.id, request.user.pk);
    }

    @Post("vote/remove")
    @HttpCode(HttpStatus.ACCEPTED)
    @ApiBearerAuth()
    @UseGuards(AccessGuard)
    async putVote(
        petitionVoteActionDto: PetitionVoteActionDto,
        @Request() request
    ) {
        return this.petitionService.removeVote(petitionVoteActionDto.id, request.user.pk);
    }


    mapInstancesToDto(instances: Petition[]): PetitionListDto[] {
        const petitionListDtos: PetitionListDto[] = instances.map(petition => {
            return {
                id: petition.id,
                name: petition.name,
                createDate: petition.createdDate,
                votesNumber: petition.votes.length
            };
        });

        return petitionListDtos;
    }
}
