import { ApiProperty } from "@nestjs/swagger";

export class ConfirmRegistrationDto {
    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly confirmationCode: string;
}