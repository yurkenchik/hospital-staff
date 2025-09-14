import { ApiProperty } from "@nestjs/swagger";

export class AppointmentDomainEntity {
    @ApiProperty()
    public readonly id: string;

    @ApiProperty()
    public readonly appointmentDate: Date;

    @ApiProperty()
    public readonly cost: number;

    @ApiProperty()
    public readonly patientId: string;

    @ApiProperty()
    public readonly doctorId: string;

    constructor(
        id: string,
        appointmentDate: Date,
        cost: number,
        patientId: string,
        doctorId: string,
    ) {
        this.id = id;
        this.appointmentDate = appointmentDate;
        this.cost = cost;
        this.patientId = patientId;
        this.doctorId = doctorId;
    }
}
