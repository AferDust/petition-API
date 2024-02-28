import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { PetitionAdminCreateDto } from './dto';
import { PetitionAdminUpdateDto } from './dto/admin/petition.admin.update';
import { Petition } from './petitions.entity';


@Injectable()
export class PetitionAdminService {
    constructor(
        @InjectRepository(Petition)
        private readonly petitionRepository: Repository<Petition>,
    ) { }

    async createPetition(createDto: PetitionAdminCreateDto): Promise<Petition> {
        const createdInstance: Petition = this.petitionRepository.create(createDto);
        return this.petitionRepository.save(createdInstance);
    }

    async updatePetition(id: number, updateDto: PetitionAdminUpdateDto): Promise<Petition> {
        const { name, description } = updateDto;

        const petition = await this.petitionRepository.findOne({ where: { id } });
        this.isNotExists(petition, id);

        petition.name = name;
        petition.description = description;
        return this.petitionRepository.save(petition);
    }

    async delete(id: number): Promise<any> {
        const instance = await this.petitionRepository.findOne({
            where: { id },
        });
        this.isNotExists(instance, id);


        await this.petitionRepository.remove(instance);
        return { message: "OK!" };
    }

    isNotExists(instance: Petition, id: number) {
        if (!instance)
            throw new NotFoundException(`Petition with ID ${id} not found`);

    }

}