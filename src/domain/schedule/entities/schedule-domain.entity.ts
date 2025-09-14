import { ApiProperty } from "@nestjs/swagger";

export class ScheduleDomainEntity {
    @ApiProperty()
    public readonly id: string;

    @ApiProperty()
    public readonly workDay: string;

    @ApiProperty()
    public readonly startTime: string;

    @ApiProperty()
    public readonly endTime: string;

    @ApiProperty()
    public readonly doctorId: string;

    constructor(
        id: string,
        workDay: string,
        startTime: string,
        endTime: string,
        doctorId: string,
    ) {
        this.id = id;
        this.workDay = workDay;
        this.startTime = startTime;
        this.endTime = endTime;
        this.doctorId = doctorId;
    }
}
