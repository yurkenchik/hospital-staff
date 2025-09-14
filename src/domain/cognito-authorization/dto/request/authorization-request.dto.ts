import { ApiProperty } from "@nestjs/swagger";

export class AuthorizationRequestDto {
    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly password: string;
}