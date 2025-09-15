import { ApiProperty } from "@nestjs/swagger";

export class CreateScheduleDto {
    @ApiProperty()
    workDay: string;

    @ApiProperty()
    startTime: string;

    @ApiProperty()
    endTime: string;
}
