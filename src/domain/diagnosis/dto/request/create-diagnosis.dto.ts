import { ApiProperty } from "@nestjs/swagger";

export class CreateDiagnosisDto {
    @ApiProperty()
    readonly diagnosisName: string;

    @ApiProperty()
    readonly description: string;
}