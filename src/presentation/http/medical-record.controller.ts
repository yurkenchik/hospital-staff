import { Body, Controller, Delete, Get, Param, Patch, Post, HttpStatus } from "@nestjs/common";
import { MedicalRecordService } from "@domain/medical-record/services/medical-record.service";
import { MedicalRecordDomainEntity } from "@domain/medical-record/entities/medical-record-domain.entity";
import { CreateMedicalRecordDto } from "@domain/medical-record/dto/request/create-medical-record.dto";
import { UpdateMedicalRecordDto } from "@domain/medical-record/dto/request/update-medical-record.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { MedicalRecordNotFoundException } from "@core/exceptions/not-found/medical-record-not-found.exception";
import { DoctorNotFoundException } from "@core/exceptions/not-found/doctor-not-found.exception";
import { PatientNotFoundException } from "@core/exceptions/not-found/patient-not-found.exception";

@Controller('medical-records')
export class MedicalRecordController {
    constructor(
        private readonly medicalRecordService: MedicalRecordService,
    ) {}

    @ApiOperation({ summary: 'Get a medical record by ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The medical record', type: MedicalRecordDomainEntity })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: MedicalRecordNotFoundException.prototype.message })
    @Get(":id")
    async getMedicalRecordById(@Param("id") medicalRecordId: string): Promise<MedicalRecordDomainEntity> {
        return this.medicalRecordService.getMedicalRecordById(medicalRecordId);
    }

    @ApiOperation({ summary: 'Get all medical records' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Array of medical records', type: [MedicalRecordDomainEntity] })
    @Get()
    async getMedicalRecords(): Promise<Array<MedicalRecordDomainEntity>> {
        return this.medicalRecordService.getMedicalRecords();
    }

    @ApiOperation({ summary: 'Get a specific medical record by ID, doctor ID, and patient ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The medical record', type: MedicalRecordDomainEntity })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: MedicalRecordNotFoundException.prototype.message })
    @Post(":id/:doctorId/:patientId") // This route should be a GET, not a POST, and should be unique
    async getMedicalRecord(
        @Param("id") medicalRecordId: string,
        @Param("doctorId") doctorId: string,
        @Param("patientId") patientId: string,
    ): Promise<MedicalRecordDomainEntity> {
        return this.medicalRecordService.getMedicalRecord(medicalRecordId, doctorId, patientId);
    }

    @ApiOperation({ summary: 'Get all medical records for a specific doctor' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Array of medical records for the doctor', type: [MedicalRecordDomainEntity] })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: DoctorNotFoundException.prototype.message })
    @Get("doctor/:doctorId")
    async getDoctorMedicalRecords(@Param("doctorId") doctorId: string): Promise<Array<MedicalRecordDomainEntity>> {
        return this.medicalRecordService.getDoctorMedicalRecords(doctorId);
    }

    @ApiOperation({ summary: 'Get all medical records for a specific patient' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Array of medical records for the patient', type: [MedicalRecordDomainEntity] })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: PatientNotFoundException.prototype.message })
    @Get("patient/:patientId")
    async getPatientMedicalRecords(@Param("patientId") patientId: string): Promise<Array<MedicalRecordDomainEntity>> {
        return this.medicalRecordService.getPatientMedicalRecords(patientId);
    }

    @ApiOperation({ summary: 'Create a new medical record' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The created medical record', type: MedicalRecordDomainEntity })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input.' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: `${DoctorNotFoundException.prototype.message} or ${PatientNotFoundException.prototype.message}` })
    @Post(":doctorId/:patientId")
    async createMedicalRecord(
        @Param("doctorId") doctorId: string,
        @Param("patientId") patientId: string,
        @Body() createMedicalRecordDto: CreateMedicalRecordDto
    ): Promise<MedicalRecordDomainEntity> {
        return this.medicalRecordService.createMedicalRecord(doctorId, patientId, createMedicalRecordDto);
    }

    @ApiOperation({ summary: 'Update a medical record by ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The updated medical record', type: MedicalRecordDomainEntity })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: MedicalRecordNotFoundException.prototype.message })
    @Patch(":id")
    async updateMedicalRecord(
        @Param("id") medicalRecordId: string,
        @Body() updateMedicalRecordDto: UpdateMedicalRecordDto
    ): Promise<MedicalRecordDomainEntity> {
        return this.medicalRecordService.updateMedicalRecord(medicalRecordId, updateMedicalRecordDto);
    }

    @ApiOperation({ summary: 'Delete a medical record by ID' })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Medical record successfully deleted.' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: MedicalRecordNotFoundException.prototype.message })
    @Delete(":id")
    async deleteMedicalRecord(@Param("id") medicalRecordId: string): Promise<void> {
        return this.medicalRecordService.deleteMedicalRecord(medicalRecordId);
    }
}
