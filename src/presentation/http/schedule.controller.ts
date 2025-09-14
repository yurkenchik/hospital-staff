import { ScheduleDomainEntity } from "@domain/schedule/entities/schedule-domain.entity";
import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ScheduleService } from "@domain/schedule/services/schedule.service";
import { CreateScheduleDto } from "@domain/schedule/dto/request/create-schedule.dto";
import { UpdateScheduleDto } from "@domain/schedule/dto/request/update-schedule.dto";

@Controller('schedules')
export class ScheduleController {
    constructor(private readonly scheduleService: ScheduleService) {}

    @Get(':id')
    async getScheduleById(@Param('id') scheduleId: string): Promise<ScheduleDomainEntity> {
        return this.scheduleService.getScheduleById(scheduleId);
    }

    @Get()
    async getSchedules(): Promise<Array<ScheduleDomainEntity>> {
        return this.scheduleService.getSchedules();
    }

    @Get('doctor/:doctorId')
    async getDoctorSchedules(@Param('doctorId') doctorId: string): Promise<Array<ScheduleDomainEntity>> {
        return this.scheduleService.getDoctorSchedules(doctorId);
    }

    @Post(":doctorId")
    async createSchedule(
        @Param("doctorId") doctorId: string,
        @Body() createScheduleDto: CreateScheduleDto
    ): Promise<ScheduleDomainEntity> {
        return this.scheduleService.createSchedule(doctorId, createScheduleDto);
    }

    @Patch(':id')
    async updateSchedule(@Param('id') scheduleId: string, @Body() updateScheduleDto: UpdateScheduleDto): Promise<ScheduleDomainEntity> {
        return this.scheduleService.updateSchedule(scheduleId, updateScheduleDto);
    }

    @Delete(':id')
    async deleteSchedule(@Param('id') scheduleId: string): Promise<void> {
        return this.scheduleService.deleteSchedule(scheduleId);
    }
}
