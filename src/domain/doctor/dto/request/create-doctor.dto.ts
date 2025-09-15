import { ApiProperty } from "@nestjs/swagger";

export class CreateDoctorDto {
    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly phoneNumber: string;

    @ApiProperty()
    readonly firstName: string;

    @ApiProperty()
    readonly lastName: string;

    @ApiProperty()
    readonly specialization: string;
}
