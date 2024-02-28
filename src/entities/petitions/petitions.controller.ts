import { Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AccessGuard } from "../../auth/guards/access.guard";
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
    async findAll(): Promise<Petition[]> {
        return this.petitionService.findAll();
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    async findOne(
        @Param("id", ParseIntPipe) id: number,
    ): Promise<Petition> {
        return this.petitionService.findOne(id);
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
}
