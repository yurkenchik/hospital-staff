import { ApiProperty } from "@nestjs/swagger";

export class CreateTreatmentDto {
    @ApiProperty()
    readonly treatmentDescription: string;

    @ApiProperty()
    readonly cost: number;

    @ApiProperty()
    readonly startDate: Date;

    @ApiProperty()
    readonly endDate: Date;
}