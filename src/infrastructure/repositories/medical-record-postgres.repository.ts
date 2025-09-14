import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository } from "typeorm";
import { MedicalRecordOrmEntity } from "@infrastructure/orm-entities/medical-record-orm.entity";
import { MedicalRecordDomainEntity } from "@domain/medical-record/entities/medical-record-domain.entity";
import { MedicalRecordOrmMapper } from "@core/mappers/orm/medical-record-orm.mapper";
import { MedicalRecordRepository } from "@domain/medical-record/repositories/medical-record.repository";
import { CreateMedicalRecordDto } from "@domain/medical-record/dto/request/create-medical-record.dto";
import { UpdateMedicalRecordDto } from "@domain/medical-record/dto/request/update-medical-record.dto";

@Injectable()
export class MedicalRecordPostgresRepository implements MedicalRecordRepository {
    constructor(
        @InjectRepository(MedicalRecordOrmEntity)
        private readonly medicalRecordRepository: Repository<MedicalRecordOrmEntity>,
    ) {}

    async getMedicalRecordById(medicalRecordId: string): Promise<MedicalRecordDomainEntity> {
        const medicalRecordOrmEntity = await this.medicalRecordRepository
            .createQueryBuilder()
            .where("id = :medicalRecordId", { medicalRecordId })
            .getOne();

        if (!medicalRecordOrmEntity) {
            return null;
        }
        return MedicalRecordOrmMapper.toDomainEntity(medicalRecordOrmEntity);
    }

    async getMedicalRecord(medicalRecordId: string, doctorId: string, patientId: string): Promise<MedicalRecordDomainEntity> {
        const medicalRecordOrmEntity = await this.medicalRecordRepository
            .createQueryBuilder("medicalRecord")
            .leftJoinAndSelect("medicalRecord.doctor", "doctor")
            .leftJoinAndSelect("medicalRecord.patient", "patient")
            .where("medicalRecord.id = :medicalRecordId AND doctor.id = :doctorId AND patient.id = :patientId", {
                medicalRecordId,
                doctorId,
                patientId
            })
            .getOne();

        if (!medicalRecordOrmEntity) {
            return null;
        }
        return MedicalRecordOrmMapper.toDomainEntity(medicalRecordOrmEntity);
    }

    async getMedicalRecords(): Promise<Array<MedicalRecordDomainEntity>> {
        const medicalRecordOrmEntities = await this.medicalRecordRepository
            .createQueryBuilder()
            .getMany();

        return medicalRecordOrmEntities.map(medicalRecord => MedicalRecordOrmMapper.toDomainEntity(medicalRecord));
    }

    async getDoctorMedicalRecords(doctorId: string): Promise<Array<MedicalRecordDomainEntity>> {
        const medicalRecordOrmEntities = await this.medicalRecordRepository
            .createQueryBuilder("medicalRecord")
            .leftJoinAndSelect("medicalRecord.doctor", "doctor")
            .where("doctor.id = :doctorId", { doctorId })
            .getMany();

        return medicalRecordOrmEntities.map(medicalRecord => MedicalRecordOrmMapper.toDomainEntity(medicalRecord));
    }

    async getPatientMedicalRecords(patientId: string): Promise<Array<MedicalRecordDomainEntity>> {
        const medicalRecordOrmEntities = await this.medicalRecordRepository
            .createQueryBuilder("medicalRecord")
            .leftJoinAndSelect("medicalRecord.patient", "patient")
            .where("patient.id = :patientId", { patientId })
            .getMany();

        return medicalRecordOrmEntities.map(medicalRecord => MedicalRecordOrmMapper.toDomainEntity(medicalRecord));
    }

    async createMedicalRecord(
        doctorId: string,
        patientId: string,
        createMedicalRecordDto: CreateMedicalRecordDto
    ): Promise<MedicalRecordDomainEntity> {
        const medicalRecordInsertResult: InsertResult = await this.medicalRecordRepository
            .createQueryBuilder()
            .insert()
            .into(MedicalRecordOrmEntity)
            .values({
                ...createMedicalRecordDto,
                doctor: { id: doctorId } as any,
                patient: { id: patientId } as any
            })
            .execute();

        const insertedMedicalRecordId = medicalRecordInsertResult.identifiers[medicalRecordInsertResult.identifiers.length - 1].id;
        return this.getMedicalRecordById(insertedMedicalRecordId);
    }

    async updateMedicalRecord(medicalRecordId: string, updateMedicalRecordDto: UpdateMedicalRecordDto): Promise<MedicalRecordDomainEntity> {
        await this.medicalRecordRepository
            .createQueryBuilder()
            .update(MedicalRecordOrmEntity)
            .set(updateMedicalRecordDto)
            .where("id = :medicalRecordId", { medicalRecordId })
            .execute();

        return this.getMedicalRecordById(medicalRecordId);
    }

    async deleteMedicalRecord(medicalRecordId: string): Promise<void> {
        await this.medicalRecordRepository
            .createQueryBuilder()
            .delete()
            .from(MedicalRecordOrmEntity)
            .where("id = :medicalRecordId", { medicalRecordId })
            .execute();
    }
}
