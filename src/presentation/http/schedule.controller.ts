import { ScheduleDomainEntity } from "@domain/schedule/entities/schedule-domain.entity";
import { Body, Controller, Delete, Get, Param, Patch, Post, HttpStatus } from "@nestjs/common";
import { ScheduleService } from "@domain/schedule/services/schedule.service";
import { CreateScheduleDto } from "@domain/schedule/dto/request/create-schedule.dto";
import { UpdateScheduleDto } from "@domain/schedule/dto/request/update-schedule.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ScheduleNotFoundException } from "@core/exceptions/not-found/schedule-not-found.exception";
import { DoctorNotFoundException } from "@core/exceptions/not-found/doctor-not-found.exception";

@Controller('schedules')
export class ScheduleController {
    constructor(private readonly scheduleService: ScheduleService) {}

    @ApiOperation({ summary: 'Get a schedule by ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The schedule record', type: ScheduleDomainEntity })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: ScheduleNotFoundException.prototype.message })
    @Get(':id')
    async getScheduleById(@Param('id') scheduleId: string): Promise<ScheduleDomainEntity> {
        return this.scheduleService.getScheduleById(scheduleId);
    }

    @ApiOperation({ summary: 'Get all schedules' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Array of schedule records', type: [ScheduleDomainEntity] })
    @Get()
    async getSchedules(): Promise<Array<ScheduleDomainEntity>> {
        return this.scheduleService.getSchedules();
    }

    @ApiOperation({ summary: 'Get all schedules for a specific doctor' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Array of schedule records for the doctor', type: [ScheduleDomainEntity] })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: DoctorNotFoundException.prototype.message })
    @Get('doctor/:doctorId')
    async getDoctorSchedules(@Param('doctorId') doctorId: string): Promise<Array<ScheduleDomainEntity>> {
        return this.scheduleService.getDoctorSchedules(doctorId);
    }

    @ApiOperation({ summary: 'Create a new schedule for a doctor' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The created schedule record', type: ScheduleDomainEntity })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input.' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: DoctorNotFoundException.prototype.message })
    @Post(":doctorId")
    async createSchedule(
        @Param("doctorId") doctorId: string,
        @Body() createScheduleDto: CreateScheduleDto
    ): Promise<ScheduleDomainEntity> {
        return this.scheduleService.createSchedule(doctorId, createScheduleDto);
    }

    @ApiOperation({ summary: 'Update a schedule by ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The updated schedule record', type: ScheduleDomainEntity })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: ScheduleNotFoundException.prototype.message })
    @Patch(':id')
    async updateSchedule(@Param('id') scheduleId: string, @Body() updateScheduleDto: UpdateScheduleDto): Promise<ScheduleDomainEntity> {
        return this.scheduleService.updateSchedule(scheduleId, updateScheduleDto);
    }

    @ApiOperation({ summary: 'Delete a schedule by ID' })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Schedule successfully deleted.' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: ScheduleNotFoundException.prototype.message })
    @Delete(':id')
    async deleteSchedule(@Param('id') scheduleId: string): Promise<void> {
        return this.scheduleService.deleteSchedule(scheduleId);
    }
}
