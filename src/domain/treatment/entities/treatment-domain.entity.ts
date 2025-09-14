import { ApiProperty } from "@nestjs/swagger";

export class TreatmentDomainEntity {
    @ApiProperty()
    public readonly id: string;

    @ApiProperty()
    public readonly treatmentDescription: string;

    @ApiProperty()
    public readonly cost: number;

    @ApiProperty()
    public readonly startDate: Date;

    @ApiProperty()
    public readonly endDate: Date;

    constructor(
        id: string,
        treatmentDescription: string,
        cost: number,
        startDate: Date,
        endDate: Date,
    ) {
        this.id = id;
        this.treatmentDescription = treatmentDescription;
        this.cost = cost;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
