import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Query, Request, UseGuards } from "@nestjs/common";
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

    @Get("filter-date-range")
    @HttpCode(HttpStatus.OK)
    async findFilteredPetitions(
        @Query('startDate') startDate?: Date,
    ): Promise<PetitionListDto[]> {
        startDate = !startDate ? new Date() : startDate;
        const petitions: Petition[] =
            await this.petitionService.findFilteredPetitionsByDate(startDate);

        return this.mapInstancesToDto(petitions);
    }

    @Get("filter-more-votes")
    @HttpCode(HttpStatus.OK)
    async findPetitionsWithMoreVotes(
        @Query('min') minVotes: number
    ): Promise<PetitionListDto[]> {
        const petitions: Petition[] =
            await this.petitionService.findPetitionsWithMoreVotes(minVotes ? minVotes : 0);

        return this.mapInstancesToDto(petitions);
    }

    @Get("all-voted-petitions")
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @UseGuards(AccessGuard)
    async allVotedPetitions(@Request() request): Promise<PetitionListDto[]> {
        console.log("I'm in controller");
        console.log(request.user.pk);
        const petitions: Petition[] = await this.petitionService.findAllVotedPetitionsOfUser(request.user.pk);
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

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query('sorting') sorting: "ASC" | "DESC"): Promise<PetitionListDto[]> {
        const petitions: Petition[] = await this.petitionService.findAll(sorting);
        return this.mapInstancesToDto(petitions);
    }

    @Post("vote/give")
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @UseGuards(AccessGuard)
    async giveVote(
        @Body() petitionVoteActionDto: PetitionVoteActionDto,
        @Request() request
    ) {
        console.log("Here: " + request.user.pk);
        return this.petitionService.giveVote(petitionVoteActionDto.petitionId, request.user.pk);
    }

    @Post("vote/remove")
    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth()
    @UseGuards(AccessGuard)
    async putVote(
        @Body() petitionVoteActionDto: PetitionVoteActionDto,
        @Request() request
    ) {
        return this.petitionService.removeVote(petitionVoteActionDto.petitionId, request.user.pk);
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
