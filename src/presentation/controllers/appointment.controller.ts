import {Controller, Get, Post, Delete, Param, Body, Patch} from "@nestjs/common";
import { CreateAppointmentDto } from "../../domain/dto/appointment/create-appointment.dto";
import { UpdateAppointmentDto } from "../../domain/dto/appointment/update-appointment.dto";
import { Appointment } from "../../domain/entities/appointment.entity";
import {AppointmentService} from "../../infrastrcuture/services/appointment.service";

@Controller('appointments')
export class AppointmentController {
    constructor(
        private readonly appointmentService: AppointmentService
    ) {}

    @Get(':id')
    async getAppointmentById(@Param('id') appointmentId: string): Promise<Appointment> {
        return this.appointmentService.getAppointmentById(appointmentId);
    }

    @Get(':id/:doctorId/:patientId')
    async getAppointment(
        @Param('id') appointmentId: string,
        @Param('doctorId') doctorId: string,
        @Param('patientId') patientId: string
    ): Promise<Appointment> {
        return this.appointmentService.getAppointment(appointmentId, doctorId, patientId);
    }

    @Get()
    async getAppointments(): Promise<Appointment[]> {
        return this.appointmentService.getAppointments();
    }

    @Get('doctor/:doctorId')
    async getDoctorAppointments(@Param('doctorId') doctorId: string): Promise<Array<Appointment>> {
        return this.appointmentService.getDoctorAppointments(doctorId);
    }

    @Get('patient/:patientId')
    async getPatientAppointments(@Param('patientId') patientId: string): Promise<Array<Appointment>> {
        return this.appointmentService.getPatientAppointments(patientId);
    }

    @Post(":doctorId/:patientId")
    async createAppointment(
        @Param('doctorId') doctorId: string,
        @Param('patientId') patientId: string,
        @Body() createAppointmentDto: CreateAppointmentDto
    ): Promise<Appointment> {
        return this.appointmentService.createAppointment(doctorId, patientId, createAppointmentDto);
    }

    @Patch(':id')
    async updateAppointment(
        @Param('id') appointmentId: string,
        @Body() updateAppointmentDto: UpdateAppointmentDto
    ): Promise<Appointment> {
        return this.appointmentService.updateAppointment(appointmentId, updateAppointmentDto);
    }

    @Delete(':id')
    async deleteAppointment(@Param('id') appointmentId: string): Promise<void> {
        return this.appointmentService.deleteAppointment(appointmentId);
    }

    @Get('diagnoses/all')
    async getAppointmentsWithDiagnoses() {
        return this.appointmentService.getAppointmentWithDiagnoses();
    }
}
