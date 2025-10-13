import { Controller, Get, Post, Delete, Param, Body, Patch, Query, HttpStatus } from "@nestjs/common";
import { AppointmentService } from "@domain/appointment/services/appointment.service";
import { AppointmentDomainEntity } from "@domain/appointment/entities/appointment-domain.entity";
import { CreateAppointmentDto } from "@domain/appointment/dto/request/create-appointment.dto";
import { UpdateAppointmentDto } from "@domain/appointment/dto/request/update-appointment.dto";
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from "@nestjs/swagger";
import { AppointmentNotFoundException } from "@core/exceptions/not-found/appointment-not-found.exception";
import { DoctorNotFoundException } from "@core/exceptions/not-found/doctor-not-found.exception";
import { PatientNotFoundException } from "@core/exceptions/not-found/patient-not-found.exception";

@Controller('appointments')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) {}

    @ApiOperation({ summary: 'Get an appointment by ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The appointment record', type: AppointmentDomainEntity })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: AppointmentNotFoundException.prototype.message })
    @Get(':id')
    async getAppointmentById(@Param('id') appointmentId: string): Promise<AppointmentDomainEntity> {
        return this.appointmentService.getAppointmentById(appointmentId);
    }

    @ApiOperation({ summary: 'Get a specific appointment by ID, doctor ID, and patient ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The appointment record', type: AppointmentDomainEntity })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: AppointmentNotFoundException.prototype.message })
    @Get(':id/:doctorId/:patientId')
    async getAppointment(
        @Param('id') appointmentId: string,
        @Param('doctorId') doctorId: string,
        @Param('patientId') patientId: string
    ): Promise<AppointmentDomainEntity> {
        return this.appointmentService.getAppointment(appointmentId, doctorId, patientId);
    }

    @ApiOperation({ summary: 'Get all appointments' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Array of appointment records', type: [AppointmentDomainEntity] })
    @Get()
    async getAppointments(): Promise<Array<AppointmentDomainEntity>> {
        return this.appointmentService.getAppointments();
    }

    @ApiOperation({ summary: 'Get all appointments for a specific doctor' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Array of appointment records for the doctor', type: [AppointmentDomainEntity] })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: DoctorNotFoundException.prototype.message })
    @Get('doctors/:doctorId')
    async getDoctorAppointments(@Param('doctorId') doctorId: string): Promise<Array<AppointmentDomainEntity>> {
        return this.appointmentService.getDoctorAppointments(doctorId);
    }

    @ApiOperation({ summary: 'Get all appointments for a specific patient' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Array of appointment records for the patient', type: [AppointmentDomainEntity] })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: PatientNotFoundException.prototype.message })
    @Get('patients/:patientId')
    async getPatientAppointments(@Param('patientId') patientId: string): Promise<Array<AppointmentDomainEntity>> {
        return this.appointmentService.getPatientAppointments(patientId);
    }

    @ApiOperation({ summary: 'Create a new appointment' })
    @ApiQuery({ name: 'doctorId', type: String, description: 'The ID of the doctor' })
    @ApiQuery({ name: 'patientId', type: String, description: 'The ID of the patient' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The created appointment record', type: AppointmentDomainEntity })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input.' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: `${DoctorNotFoundException.prototype.message} or ${PatientNotFoundException.prototype.message}` })
    @Post()
    async createAppointment(
        @Query('doctorId') doctorId: string,
        @Query('patientId') patientId: string,
        @Body() createAppointmentDto: CreateAppointmentDto
    ): Promise<AppointmentDomainEntity> {
        return this.appointmentService.createAppointment(doctorId, patientId, createAppointmentDto);
    }

    @ApiOperation({ summary: 'Update an appointment by ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The updated appointment record', type: AppointmentDomainEntity })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: AppointmentNotFoundException.prototype.message })
    @Patch(':id')
    async updateAppointment(
        @Param('id') appointmentId: string,
        @Body() updateAppointmentDto: UpdateAppointmentDto
    ): Promise<AppointmentDomainEntity> {
        return this.appointmentService.updateAppointment(appointmentId, updateAppointmentDto);
    }

    @ApiOperation({ summary: 'Delete an appointment by ID' })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Appointment successfully deleted.' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: AppointmentNotFoundException.prototype.message })
    @Delete(':id')
    async deleteAppointment(@Param('id') appointmentId: string): Promise<void> {
        return this.appointmentService.deleteAppointment(appointmentId);
    }
}
