import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { PetitionService } from "../../entities/petitions/petitions.service";

@ValidatorConstraint({ name: "IsPetitionExists", async: true })
@Injectable()
export class IsPetitionExists implements ValidatorConstraintInterface {
    constructor(private readonly petitionService: PetitionService) { }

    async validate(id: number, args: ValidationArguments) {
        console.log("Here in validator: " + id);

        return await this.petitionService.findOne(id).then((petition) => {
            return petition ? true : false;
        });
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return `Petitions doesn't exists.`;
    }
}
