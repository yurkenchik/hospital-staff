import { ApiProperty } from "@nestjs/swagger";

export class CreatePatientDto {
    @ApiProperty()
    readonly firstName: string;

    @ApiProperty()
    readonly lastName: string;

    @ApiProperty()
    readonly birthDate: string;

    @ApiProperty()
    readonly phoneNumber: string;
}