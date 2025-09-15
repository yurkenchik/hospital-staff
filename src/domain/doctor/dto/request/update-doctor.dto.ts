import { ApiProperty } from "@nestjs/swagger";

export class UpdateDoctorDto {
    @ApiProperty()
    readonly email?: string;

    @ApiProperty()
    readonly phoneNumber?: string;

    @ApiProperty()
    readonly firstName?: string;

    @ApiProperty()
    readonly lastName?: string;
}
