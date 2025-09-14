import { ApiProperty } from "@nestjs/swagger";

export class PatientDomainEntity {
    @ApiProperty()
    public readonly id: string;

    @ApiProperty()
    public readonly firstName: string;

    @ApiProperty()
    public readonly lastName: string;

    @ApiProperty()
    public readonly birthdate: string;

    @ApiProperty()
    public readonly phoneNumber: string;

    constructor(
        id: string,
        firstName: string,
        lastName: string,
        birthdate: string,
        phoneNumber: string,
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthdate = birthdate;
        this.phoneNumber = phoneNumber;
    }
}
