import { ApiProperty } from "@nestjs/swagger";

export class CreatePatientDto {
    @ApiProperty()
    readonly firstName: string;

    @ApiProperty()
    readonly lastName: string;

    @ApiProperty()
    readonly birthdate: string;

    @ApiProperty()
    readonly phoneNumber: string;
}