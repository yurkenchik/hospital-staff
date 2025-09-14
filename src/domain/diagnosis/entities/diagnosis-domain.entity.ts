import { ApiProperty } from "@nestjs/swagger";

export class DiagnosisDomainEntity {
    @ApiProperty()
    public readonly id: string;

    @ApiProperty()
    public readonly diagnosisName: string;

    @ApiProperty()
    public readonly description?: string;

    constructor(
        id: string,
        diagnosisName: string,
        description?: string,
    ) {
        this.id = id;
        this.diagnosisName = diagnosisName;
        this.description = description;
    }
}
