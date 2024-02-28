import { Body, Controller, Delete, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AccessGuard, IsAdminGuard } from "../../auth/guards/";
import { PetitionAdminCreateDto, PetitionAdminUpdateDto } from "./dto";
import { PetitionAdminService } from "./petition.admin.service";
import { Petition } from "./petitions.entity";

@ApiTags("Admin-Petition")
@Controller("admin-petition")
@ApiBearerAuth()
@UseGuards(AccessGuard, IsAdminGuard)
export class PetitionAdminController {
    constructor(
        private readonly petitionAdminService: PetitionAdminService
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createDto: PetitionAdminCreateDto): Promise<Petition> {
        return this.petitionAdminService.createPetition(createDto);
    }

    @Put("/:id")
    @HttpCode(HttpStatus.ACCEPTED)
    update(
        @Param("id", ParseIntPipe) id: number,
        @Body() updateData: PetitionAdminUpdateDto
    ): Promise<Petition> {
        return this.petitionAdminService.updatePetition(id, updateData);
    }


    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param("id", ParseIntPipe) id: number) {
        return this.petitionAdminService.delete(id);
    }
}
