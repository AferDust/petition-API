import { Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Query, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AccessGuard } from "../../auth/guards/access.guard";
import { PetitionListDto, PetitionRetrieveDto, PetitionVoteActionDto } from "./dto";
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
    async findAll(@Query('sorting') sorting: "ASC" | "DESC"): Promise<PetitionListDto[]> {
        const petitions: Petition[] = await this.petitionService.findAll(sorting);
        return this.mapInstancesToDto(petitions);
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    async findOne(
        @Param("id", ParseIntPipe) id: number,
    ): Promise<PetitionRetrieveDto> {
        const petition: Petition = await this.petitionService.findOne(id);
        return this.mapInstanceToDto(petition);
    }

    @Get('all-voted-petitions')
    @HttpCode(HttpStatus.ACCEPTED)
    @ApiBearerAuth()
    @UseGuards(AccessGuard)
    async allVotedPetitions(@Request() request): Promise<PetitionListDto[]> {
        const petitions: Petition[] = await this.petitionService.findAllVotedPetitionsOfUser(request.user.pk);
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

    @Get('filter-date-range')
    async findFilteredPetitions(
        @Query('startDate') startDate?: Date,
        @Query('endDate') endDate?: Date,
    ): Promise<PetitionListDto[]> {
        startDate = (!startDate && !endDate) ? new Date() : startDate;
        const petitions: Petition[] =
            await this.petitionService.findFilteredPetitionsByDate(startDate, endDate);

        return this.mapInstancesToDto(petitions);
    }

    @Get('filter-more-votes')
    async findPetitionsWithMoreVotes(
        @Query('min') minVotes: number
    ): Promise<PetitionListDto[]> {
        const petitions: Petition[] =
            await this.petitionService.findPetitionsWithMoreVotes(minVotes ? minVotes : 0);

        return this.mapInstancesToDto(petitions);
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

    mapInstanceToDto(instance: Petition): PetitionRetrieveDto {
        const votes = instance.votes.map(vote => ({
            id: vote.id,
            dateTime: vote.dateTime,
            user: {
                login: vote.user.login,
            },
        }));

        const petitionRetrieveDto: PetitionRetrieveDto = {
            id: instance.id,
            name: instance.name,
            description: instance.description,
            createDate: instance.createdDate,
            votesNumber: votes.length,
            votes: votes,
        };

        return petitionRetrieveDto;
    }
}
