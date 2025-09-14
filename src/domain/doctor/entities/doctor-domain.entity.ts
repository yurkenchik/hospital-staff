import { ApiProperty } from "@nestjs/swagger";

export class DoctorDomainEntity {
    @ApiProperty()
    public readonly id: string;

    @ApiProperty()
    public readonly firstName: string;

    @ApiProperty()
    public readonly lastName: string;

    @ApiProperty()
    public readonly specialization: string;

    @ApiProperty()
    public readonly phoneNumber: string;

    @ApiProperty()
    public readonly email: string;

    constructor(
        id: string,
        firstName: string,
        lastName: string,
        specialization: string,
        phoneNumber: string,
        email: string,
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.specialization = specialization;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
}