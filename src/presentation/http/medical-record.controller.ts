import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { MedicalRecordService } from "@domain/medical-record/services/medical-record.service";
import { MedicalRecordDomainEntity } from "@domain/medical-record/entities/medical-record-domain.entity";
import { CreateMedicalRecordDto } from "@domain/medical-record/dto/request/create-medical-record.dto";
import { UpdateMedicalRecordDto } from "@domain/medical-record/dto/request/update-medical-record.dto";

@Controller('medical-records')
export class MedicalRecordController {
    constructor(
        private readonly medicalRecordService: MedicalRecordService,
    ) {}

    @Get(":id")
    async getMedicalRecordById(@Param("id") patientId: string): Promise<MedicalRecordDomainEntity> {
        return this.medicalRecordService.getMedicalRecordById(patientId);
    }

    @Get()
    async getMedicalRecords(): Promise<Array<MedicalRecordDomainEntity>> {
        return this.medicalRecordService.getMedicalRecords();
    }

    @Post(":id/:doctorId/:patientId")
    async getMedicalRecord(
        @Param("id") medicalRecordId: string,
        @Param("doctorId") doctorId: string,
        @Param("patientId") patientId: string,
    ): Promise<MedicalRecordDomainEntity> {
        return this.medicalRecordService.getMedicalRecord(medicalRecordId, doctorId, patientId);
    }

    @Get("doctor/:doctorId")
    async getDoctorMedicalRecords(@Param("doctorId") doctorId: string): Promise<Array<MedicalRecordDomainEntity>> {
        return this.medicalRecordService.getDoctorMedicalRecords(doctorId);
    }

    @Get("patient/:patientId")
    async getPatientMedicalRecords(@Param("patientId") patientId: string): Promise<Array<MedicalRecordDomainEntity>> {
        return this.medicalRecordService.getPatientMedicalRecords(patientId);
    }

    @Post(":doctorId/:patientId")
    async createMedicalRecord(
        @Param("doctorId") doctorId: string,
        @Param("patientId") patientId: string,
        @Body() createMedicalRecordDto: CreateMedicalRecordDto
    ): Promise<MedicalRecordDomainEntity> {
        return this.medicalRecordService.createMedicalRecord(doctorId, patientId, createMedicalRecordDto);
    }

    @Patch(":id")
    async updateMedicalRecord(
        @Param("id") medicalRecordId: string,
        @Body() updateMedicalRecordDto: UpdateMedicalRecordDto
    ): Promise<MedicalRecordDomainEntity> {
        return this.medicalRecordService.updateMedicalRecord(medicalRecordId, updateMedicalRecordDto);
    }

    @Delete(":id")
    async deleteMedicalRecord(@Param("id") medicalRecordId: string): Promise<void> {
        return this.medicalRecordService.deleteMedicalRecord(medicalRecordId);
    }
}
