import { ApiProperty } from "@nestjs/swagger";

export class UpdateDiagnosisDto {
    @ApiProperty()
    readonly diagnosisName: string;

    @ApiProperty()
    readonly description: string;
}