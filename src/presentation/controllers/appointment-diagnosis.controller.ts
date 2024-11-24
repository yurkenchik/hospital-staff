import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AppointmentDiagnosis } from '../../domain/entities/appointment-diagnosis.entity';
import { CreateAppointmentDiagnosisDto } from '../../domain/dto/appointment-diagnosis/create-appointment-diagnosis.dto';
import { UpdateAppointmentDiagnosisDto } from '../../domain/dto/appointment-diagnosis/update-appointment-diagnosis.dto';
import {AppointmentDiagnosisService} from "../../infrastrcuture/services/appointment-diagnosis.service";

@Controller('appointment-diagnosis')
export class AppointmentDiagnosisController {
    constructor(
        private readonly appointmentDiagnosisService: AppointmentDiagnosisService
    ) {}

    @Get()
    async getAll(): Promise<Array<AppointmentDiagnosis>> {
        return this.appointmentDiagnosisService.getAllAppointmentsWithDiagnoses();
    }

    @Get(':id')
    async getAppointmentDiagnosis(
        @Param('id') id: string,
        @Query('appointmentId') appointmentId: string,
        @Query('diagnosisId') diagnosisId: string,
    ): Promise<AppointmentDiagnosis> {
        return await this.appointmentDiagnosisService.getAppointmentDiagnosis(id, appointmentId, diagnosisId);
    }

    @Get()
    async getAppointmentDiagnoses(
        @Query('appointmentId') appointmentId: string,
        @Query('diagnosisId') diagnosisId: string,
    ): Promise<AppointmentDiagnosis[]> {
        return await this.appointmentDiagnosisService.getAppointmentDiagnoses(appointmentId, diagnosisId);
    }

    @Post()
    async createAppointmentDiagnosis(
        @Body() createAppointmentDiagnosisDto: CreateAppointmentDiagnosisDto,
    ): Promise<AppointmentDiagnosis> {
        return await this.appointmentDiagnosisService.createAppointmentDiagnosis(createAppointmentDiagnosisDto);
    }

    @Put(':id')
    async updateAppointmentDiagnosis(
        @Param('id') id: string,
        @Body() updateAppointmentDiagnosisDto: UpdateAppointmentDiagnosisDto,
    ): Promise<AppointmentDiagnosis> {
        return await this.appointmentDiagnosisService.updateAppointmentDiagnosis(id, updateAppointmentDiagnosisDto);
    }

    @Delete(':id')
    async deleteAppointmentDiagnosis(@Param('id') id: string): Promise<void> {
        return await this.appointmentDiagnosisService.deleteAppointmentDiagnosis(id);
    }
}
