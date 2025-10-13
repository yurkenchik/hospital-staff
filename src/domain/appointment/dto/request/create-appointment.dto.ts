import { ApiProperty } from "@nestjs/swagger";

export class CreateAppointmentDto {
    @ApiProperty()
    readonly appointmentDate: Date;

    @ApiProperty()
    readonly cost: number;
}