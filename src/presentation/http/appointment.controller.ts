import { Controller, Get, Post, Delete, Param, Body, Patch, Query } from "@nestjs/common";
import { AppointmentService } from "@domain/appointment/services/appointment.service";
import { AppointmentDomainEntity } from "@domain/appointment/entities/appointment-domain.entity";
import { CreateAppointmentDto } from "@domain/appointment/dto/request/create-appointment.dto";
import { UpdateAppointmentDto } from "@domain/appointment/dto/request/update-appointment.dto";

@Controller('appointments')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) {}

    @Get(':id')
    async getAppointmentById(@Param('id') appointmentId: string): Promise<AppointmentDomainEntity> {
        return this.appointmentService.getAppointmentById(appointmentId);
    }

    @Get(':id/:doctorId/:patientId')
    async getAppointment(
        @Param('id') appointmentId: string,
        @Param('doctorId') doctorId: string,
        @Param('patientId') patientId: string
    ): Promise<AppointmentDomainEntity> {
        return this.appointmentService.getAppointment(appointmentId, doctorId, patientId);
    }

    @Get()
    async getAppointments(): Promise<Array<AppointmentDomainEntity>> {
        return this.appointmentService.getAppointments();
    }

    @Get('doctors/:doctorId')
    async getDoctorAppointments(@Param('doctorId') doctorId: string): Promise<Array<AppointmentDomainEntity>> {
        return this.appointmentService.getDoctorAppointments(doctorId);
    }

    @Get('patients/:patientId')
    async getPatientAppointments(@Param('patientId') patientId: string): Promise<Array<AppointmentDomainEntity>> {
        return this.appointmentService.getPatientAppointments(patientId);
    }

    @Post()
    async createAppointment(
        @Query('doctorId') doctorId: string,
        @Query('patientId') patientId: string,
        @Body() createAppointmentDto: CreateAppointmentDto
    ): Promise<AppointmentDomainEntity> {
        return this.appointmentService.createAppointment(doctorId, patientId, createAppointmentDto);
    }

    @Patch(':id')
    async updateAppointment(
        @Param('id') appointmentId: string,
        @Body() updateAppointmentDto: UpdateAppointmentDto
    ): Promise<AppointmentDomainEntity> {
        return this.appointmentService.updateAppointment(appointmentId, updateAppointmentDto);
    }

    @Delete(':id')
    async deleteAppointment(@Param('id') appointmentId: string): Promise<void> {
        return this.appointmentService.deleteAppointment(appointmentId);
    }
}
