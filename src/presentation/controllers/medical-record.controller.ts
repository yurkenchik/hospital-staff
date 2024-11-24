import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {MedicalRecordService} from "../../infrastrcuture/services/medical-record.service";
import {MedicalRecord} from "../../domain/entities/medical-record.entity";
import {CreateMedicalRecordDto} from "../../domain/dto/medical-record/create-medical-record.dto";
import {UpdateMedicalRecordDto} from "../../domain/dto/medical-record/update-medical-record.dto";

@Controller('medical-records')
export class MedicalRecordController {
    constructor(
        private readonly medicalRecordService: MedicalRecordService,
    ) {}

    @Get(":id")
    async getMedicalRecordById(@Param("id") patientId: string): Promise<MedicalRecord> {
        return this.medicalRecordService.getMedicalRecordById(patientId);
    }

    @Get()
    async getMedicalRecords(): Promise<Array<MedicalRecord>> {
        return this.medicalRecordService.getMedicalRecords();
    }

    @Post(":id/:doctorId/:patientId")
    async getMedicalRecord(
        @Param("id") medicalRecordId: string,
        @Param("doctorId") doctorId: string,
        @Param("patientId") patientId: string,
    ): Promise<MedicalRecord> {
        return this.medicalRecordService.getMedicalRecord(medicalRecordId, doctorId, patientId);
    }

    @Get("doctor/:doctorId")
    async getDoctorMedicalRecords(@Param("doctorId") doctorId: string): Promise<Array<MedicalRecord>> {
        return this.medicalRecordService.getDoctorMedicalRecords(doctorId);
    }

    @Get("patient/:patientId")
    async getPatientMedicalRecords(@Param("patientId") patientId: string): Promise<Array<MedicalRecord>> {
        return this.medicalRecordService.getPatientMedicalRecords(patientId);
    }

    @Post(":doctorId/:patientId")
    async createMedicalRecord(
        @Param("doctorId") doctorId: string,
        @Param("patientId") patientId: string,
        @Body() createMedicalRecordDto: CreateMedicalRecordDto
    ): Promise<MedicalRecord> {
        return this.medicalRecordService.createMedicalRecord(doctorId, patientId, createMedicalRecordDto);
    }

    @Patch(":id")
    async updateMedicalRecord(
        @Param("id") medicalRecordId: string,
        @Body() updateMedicalRecordDto: UpdateMedicalRecordDto
    ): Promise<MedicalRecord> {
        return this.medicalRecordService.updateMedicalRecord(medicalRecordId, updateMedicalRecordDto);
    }

    @Delete(":id")
    async deleteMedicalRecord(@Param("id") medicalRecordId: string) {
        return this.medicalRecordService.deleteMedicalRecord(medicalRecordId);
    }
}
