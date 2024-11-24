import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {InsertResult, Repository} from 'typeorm';
import { DoctorService } from './doctor.service';
import { PatientService } from './patient.service';
import {MedicalRecordRepository} from "../../domain/repositories/medical-record.repository";
import {MedicalRecord} from "../../domain/entities/medical-record.entity";
import {CreateMedicalRecordDto} from "../../domain/dto/medical-record/create-medical-record.dto";
import {UpdateMedicalRecordDto} from "../../domain/dto/medical-record/update-medical-record.dto";
import {MedicalRecordNotFoundException} from "../../common/exceptions/not-found/medical-record-not-found.exception";

@Injectable()
export class MedicalRecordService extends MedicalRecordRepository {
    constructor(
        @InjectRepository(MedicalRecord)
        private readonly medicalRecordRepository: Repository<MedicalRecord>,
        private readonly doctorService: DoctorService,
        private readonly patientService: PatientService,
    ) {
        super();
    }

    async getMedicalRecordById(medicalRecordId: string): Promise<MedicalRecord> {
        const medicalRecord = await this.medicalRecordRepository
            .createQueryBuilder()
            .where("id = :medicalRecordId", { medicalRecordId })
            .getOne();

        if (!medicalRecord) {
            throw new MedicalRecordNotFoundException();
        }
        return medicalRecord;
    }

    async getMedicalRecord(medicalRecordId: string, doctorId: string, patientId: string): Promise<MedicalRecord> {
        const medicalRecord = await this.medicalRecordRepository
            .createQueryBuilder("medicalRecord")
            .leftJoinAndSelect("medicalRecord.doctor", "doctor")
            .leftJoinAndSelect("medicalRecord.patient", "patient")
            .where("medicalRecord.id = :medicalRecordId AND doctor.id = :doctorId AND patient.id = :patientId", {
                medicalRecordId,
                doctorId,
                patientId
            })
            .getOne();

        if (!medicalRecord) {
            throw new MedicalRecordNotFoundException();
        }
        return medicalRecord;
    }

    async getMedicalRecords(): Promise<Array<MedicalRecord>> {
        return this.medicalRecordRepository
            .createQueryBuilder()
            .getMany();
    }

    async getDoctorMedicalRecords(doctorId: string): Promise<Array<MedicalRecord>> {
        const doctor = await this.doctorService.getDoctorById(doctorId);

        return this.medicalRecordRepository
            .createQueryBuilder("medicalRecord")
            .leftJoinAndSelect("medicalRecord.doctor", "doctor")
            .where("doctor.id = :doctorId", { doctorId: doctor.id })
            .getMany();
    }

    async getPatientMedicalRecords(patientId: string): Promise<Array<MedicalRecord>> {
        const patient = await this.patientService.getPatientById(patientId);

        return this.medicalRecordRepository
            .createQueryBuilder("medicalRecord")
            .leftJoinAndSelect("medicalRecord.patient", "patient")
            .where("patient.id = :patientId", { patientId: patient.id })
            .getMany();
    }

    async createMedicalRecord(
        doctorId: string,
        patientId: string,
        createMedicalRecordDto: CreateMedicalRecordDto
    ): Promise<MedicalRecord> {
        const doctor = await this.doctorService.getDoctorById(doctorId);
        const patient = await this.patientService.getPatientById(patientId);

        const medicalRecordInsertResult: InsertResult = await this.medicalRecordRepository
            .createQueryBuilder()
            .insert()
            .into(MedicalRecord)
            .values({
                ...createMedicalRecordDto,
                doctor,
                patient
            })
            .execute();

        const insertedMedicalRecordId = medicalRecordInsertResult.identifiers[medicalRecordInsertResult.identifiers.length - 1].id;
        return this.getMedicalRecordById(insertedMedicalRecordId);
    }

    async updateMedicalRecord(medicalRecordId: string, updateMedicalRecordDto: UpdateMedicalRecordDto): Promise<MedicalRecord> {
        await this.medicalRecordRepository
            .createQueryBuilder()
            .update()
            .set(updateMedicalRecordDto)
            .where("id = :medicalRecordId", { medicalRecordId })
            .execute();

        return this.getMedicalRecordById(medicalRecordId);
    }

    async deleteMedicalRecord(medicalRecordId: string): Promise<void> {
        await this.medicalRecordRepository
            .createQueryBuilder()
            .delete()
            .from(MedicalRecord)
            .where("id = :medicalRecordId", { medicalRecordId })
            .execute();
    }
}
