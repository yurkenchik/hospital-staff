import { ApiProperty } from "@nestjs/swagger";

export class MedicalRecordDomainEntity {
    @ApiProperty()
    public readonly id: string;

    @ApiProperty()
    public readonly visitDate: Date;

    @ApiProperty()
    public readonly notes: string;

    @ApiProperty()
    public readonly patientId: string;

    @ApiProperty()
    public readonly doctorId: string;

    constructor(
        id: string,
        visitDate: Date,
        notes: string,
        patientId: string,
        doctorId: string,
    ) {
        this.id = id;
        this.visitDate = visitDate;
        this.notes = notes;
        this.patientId = patientId;
        this.doctorId = doctorId;
    }
}
