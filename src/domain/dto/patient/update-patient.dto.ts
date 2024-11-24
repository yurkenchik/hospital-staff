import {IsOptional} from "class-validator";

export class UpdatePatientDto {
    @IsOptional()
    readonly firstName: string;
    @IsOptional()
    readonly lastName: string;
    @IsOptional()
    readonly birthDate: string;
    @IsOptional()
    readonly phoneNumber: string;
}