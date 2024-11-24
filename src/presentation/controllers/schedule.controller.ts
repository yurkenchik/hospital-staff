import {Controller, Get, Post, Put, Delete, Param, Body, Patch} from '@nestjs/common';
import {ScheduleService} from "../../infrastrcuture/services/schedule.service";
import {Schedule} from "../../domain/entities/schedule.entity";
import {CreateScheduleDto} from "../../domain/dto/schedule/create-schedule.dto";
import {UpdateScheduleDto} from "../../domain/dto/schedule/update-schedule.dto";

@Controller('schedules')
export class ScheduleController {
    constructor(
        private readonly scheduleService: ScheduleService
    ) {}

    @Get(':id')
    async getScheduleById(@Param('id') scheduleId: string): Promise<Schedule> {
        return this.scheduleService.getScheduleById(scheduleId);
    }

    @Get()
    async getSchedules(): Promise<Array<Schedule>> {
        return this.scheduleService.getSchedules();
    }

    @Get('doctor/:doctorId')
    async getDoctorSchedules(@Param('doctorId') doctorId: string): Promise<Array<Schedule>> {
        return this.scheduleService.getDoctorSchedules(doctorId);
    }

    @Post(":doctorId")
    async createSchedule(
        @Param("doctorId") doctorId: string,
        @Body() createScheduleDto: CreateScheduleDto
    ): Promise<Schedule> {
        return this.scheduleService.createSchedule(doctorId, createScheduleDto);
    }

    @Patch(':id')
    async updateSchedule(@Param('id') scheduleId: string, @Body() updateScheduleDto: UpdateScheduleDto): Promise<Schedule> {
        return this.scheduleService.updateSchedule(scheduleId, updateScheduleDto);
    }

    @Delete(':id')
    async deleteSchedule(@Param('id') scheduleId: string): Promise<void> {
        return this.scheduleService.deleteSchedule(scheduleId);
    }
}
