import {IsOptional} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateScheduleDto {
    @ApiProperty()
    @IsOptional()
    readonly doctorId: string;

    @ApiProperty()
    @IsOptional()
    readonly workDay: string;

    @ApiProperty()
    @IsOptional()
    readonly startTime: string;

    @ApiProperty()
    @IsOptional()
    readonly endTime: string;
}