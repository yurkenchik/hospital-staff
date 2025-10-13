import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { MedicalRecordRepository } from "../repositories/medical-record.repository";
import { MedicalRecordDomainEntity } from "../entities/medical-record-domain.entity";
import { MedicalRecordNotFoundException } from "@core/exceptions/not-found/medical-record-not-found.exception";
import { CreateMedicalRecordDto } from "../dto/request/create-medical-record.dto";
import { UpdateMedicalRecordDto } from "../dto/request/update-medical-record.dto";
import { DoctorService } from "@domain/doctor/services/doctor.service";
import { PatientService } from "@domain/patient/services/patient.service";
import { MEDICAL_RECORD_REPOSITORY } from "@domain/medical-record/medical-record.tokens";

@Injectable()
export class MedicalRecordService {
    constructor(
        @Inject(MEDICAL_RECORD_REPOSITORY)
        private readonly medicalRecordRepository: MedicalRecordRepository,
        private readonly doctorService: DoctorService,
        private readonly patientService: PatientService,
    ) {}

    async getMedicalRecordById(medicalRecordId: string): Promise<MedicalRecordDomainEntity> {
        const medicalRecord = await this.medicalRecordRepository.getMedicalRecordById(medicalRecordId);
        if (!medicalRecord) {
            throw new MedicalRecordNotFoundException();
        }
        return medicalRecord;
    }

    async getMedicalRecord(medicalRecordId: string, doctorId: string, patientId: string): Promise<MedicalRecordDomainEntity> {
        const medicalRecord = await this.medicalRecordRepository.getMedicalRecord(medicalRecordId, doctorId, patientId);
        if (!medicalRecord) {
            throw new MedicalRecordNotFoundException();
        }
        return medicalRecord;
    }

    async getMedicalRecords(): Promise<Array<MedicalRecordDomainEntity>> {
        return this.medicalRecordRepository.getMedicalRecords();
    }

    async getDoctorMedicalRecords(doctorId: string): Promise<Array<MedicalRecordDomainEntity>> {
        const doctor = await this.doctorService.getDoctorById(doctorId);
        return this.medicalRecordRepository.getDoctorMedicalRecords(doctor.id);
    }

    async getPatientMedicalRecords(patientId: string): Promise<Array<MedicalRecordDomainEntity>> {
        const patient = await this.patientService.getPatientById(patientId);
        return this.medicalRecordRepository.getPatientMedicalRecords(patient.id);
    }

    async createMedicalRecord(
        doctorId: string,
        patientId: string,
        createMedicalRecordDto: CreateMedicalRecordDto
    ): Promise<MedicalRecordDomainEntity> {
        const doctor = await this.doctorService.getDoctorById(doctorId);
        const patient = await this.patientService.getPatientById(patientId);

        return await this.medicalRecordRepository.createMedicalRecord(doctor.id, patient.id, createMedicalRecordDto);
    }

    async updateMedicalRecord(medicalRecordId: string, updateMedicalRecordDto: UpdateMedicalRecordDto): Promise<MedicalRecordDomainEntity> {
        return await this.medicalRecordRepository.updateMedicalRecord(medicalRecordId, updateMedicalRecordDto);
    }

    async deleteMedicalRecord(medicalRecordId: string): Promise<void> {
        await this.medicalRecordRepository.deleteMedicalRecord(medicalRecordId);
    }
}
