import {IsOptional} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePatientDto {
    @ApiProperty()
    @IsOptional()
    readonly firstName: string;

    @ApiProperty()
    @IsOptional()
    readonly lastName: string;

    @ApiProperty()
    @IsOptional()
    readonly birthDate: string;

    @ApiProperty()
    @IsOptional()
    readonly phoneNumber: string;
}