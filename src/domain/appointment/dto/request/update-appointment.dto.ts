import {IsOptional} from "class-validator";

export class UpdateAppointmentDto {
    @IsOptional()
    readonly appointmentDate: Date;
    @IsOptional()
    readonly cost: number;
}