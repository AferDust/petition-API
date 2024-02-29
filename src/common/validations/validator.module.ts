import { Module } from "@nestjs/common";
import { PetitionModule } from "../../entities/petitions/petitions.module";
import { IsPetitionExists } from "./is-petition-exists.validation";

@Module({
    imports: [PetitionModule],
    controllers: [],
    providers: [IsPetitionExists],
    exports: [IsPetitionExists],
})
export class ValidatorModule { }
