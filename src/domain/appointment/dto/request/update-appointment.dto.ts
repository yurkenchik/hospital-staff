import {IsOptional} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateAppointmentDto {
    @ApiProperty()
    @IsOptional()
    readonly appointmentDate: Date;

    @ApiProperty()
    @IsOptional()
    readonly cost: number;
}