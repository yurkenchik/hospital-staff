import { ApiProperty } from "@nestjs/swagger";

export class CreateMedicalRecordDto {
    @ApiProperty()
    readonly visitDate: Date;

    @ApiProperty()
    readonly notes: string;
}