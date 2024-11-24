import {IsOptional} from "class-validator";

export class UpdateScheduleDto {
    @IsOptional()
    readonly doctorId: string;
    @IsOptional()
    readonly workDay: string;
    @IsOptional()
    readonly startTime: string;
    @IsOptional()
    readonly endTime: string;
}