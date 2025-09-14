import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository } from "typeorm";
import { PatientOrmEntity } from "@infrastructure/orm-entities/patient-orm.entity";
import { PatientDomainEntity } from "@domain/patient/entities/patient-domain.entity";
import { PatientOrmMapper } from "@core/mappers/orm/patiner-orm.mapper";
import { PatientRepository } from "@domain/patient/repositories/patient.repository";
import { CreatePatientDto } from "@domain/patient/dto/request/create-patient.dto";
import { UpdatePatientDto } from "@domain/patient/dto/request/update-patient.dto";

@Injectable()
export class PatientPostgresRepository implements PatientRepository {
    constructor(
        @InjectRepository(PatientOrmEntity)
        private readonly patientRepository: Repository<PatientOrmEntity>,
    ) {}

    async getPatientById(id: string): Promise<PatientDomainEntity | null> {
        const patientOrmEntity = await this.patientRepository
            .createQueryBuilder()
            .where("id = :id", { id })
            .getOne();

        if (!patientOrmEntity) {
            return null;
        }
        return PatientOrmMapper.toDomainEntity(patientOrmEntity);
    }

    async getPatients(): Promise<Array<PatientDomainEntity>> {
        const patientOrmEntities = await this.patientRepository
            .createQueryBuilder()
            .getMany();

        return patientOrmEntities.map(patient => PatientOrmMapper.toDomainEntity(patient));
    }

    async createPatient(createPatientDto: CreatePatientDto): Promise<PatientDomainEntity> {
        const patientInsertResult: InsertResult = await this.patientRepository
            .createQueryBuilder()
            .insert()
            .into(PatientOrmEntity)
            .values(createPatientDto)
            .execute();

        const insertedPatientId = patientInsertResult.identifiers[patientInsertResult.identifiers.length - 1].id;
        return this.getPatientById(insertedPatientId);
    }

    async updatePatient(
        id: string,
        updatePatientDto: UpdatePatientDto
    ): Promise<PatientDomainEntity> {
        await this.patientRepository
            .createQueryBuilder()
            .update(PatientOrmEntity)
            .set(updatePatientDto)
            .where("id = :id", { id })
            .execute();

        return await this.getPatientById(id);
    }

    async deletePatient(id: string): Promise<void> {
        await this.patientRepository
            .createQueryBuilder()
            .delete()
            .from(PatientOrmEntity)
            .where("id = :id", { id })
            .execute();
    }
}
