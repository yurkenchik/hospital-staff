import { ApiProperty } from "@nestjs/swagger";

export class UpdateMedicalRecordDto {
    @ApiProperty()
    readonly visitDate: Date;

    @ApiProperty()
    readonly notes: string;
}