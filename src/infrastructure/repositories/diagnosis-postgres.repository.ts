import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository } from "typeorm";
import { DiagnosisOrmEntity } from "@infrastructure/orm-entities/diagnosis-orm.entity";
import { DiagnosisDomainEntity } from "@domain/diagnosis/entities/diagnosis-domain.entity";
import { DiagnosisOrmMapper } from "@core/mappers/orm/diagnosis-orm.mapper";
import { DiagnosisRepository } from "@domain/diagnosis/repositories/diagnosis.repository";
import { CreateDiagnosisDto } from "@domain/diagnosis/dto/request/create-diagnosis.dto";
import { UpdateDiagnosisDto } from "@domain/diagnosis/dto/request/update-diagnosis.dto";

@Injectable()
export class DiagnosisPostgresRepository implements DiagnosisRepository {
    constructor(
        @InjectRepository(DiagnosisOrmEntity)
        private readonly diagnosisRepository: Repository<DiagnosisOrmEntity>,
    ) {}

    async getDiagnosisById(id: string): Promise<DiagnosisDomainEntity | null> {
        const diagnosisOrmEntity = await this.diagnosisRepository
            .createQueryBuilder()
            .where("id = :id", { id })
            .getOne();

        if (!diagnosisOrmEntity) {
            return null;
        }
        return DiagnosisOrmMapper.toDomainEntity(diagnosisOrmEntity);
    }

    async getDiagnoses(): Promise<Array<DiagnosisDomainEntity>> {
        const diagnosisOrmEntities = await this.diagnosisRepository
            .createQueryBuilder()
            .getMany();

        return diagnosisOrmEntities.map(diagnosis => DiagnosisOrmMapper.toDomainEntity(diagnosis));
    }

    async createDiagnosis(createDiagnosisDto: CreateDiagnosisDto): Promise<DiagnosisDomainEntity> {
        const diagnosisInsertResult: InsertResult = await this.diagnosisRepository
            .createQueryBuilder()
            .insert()
            .into(DiagnosisOrmEntity)
            .values(createDiagnosisDto)
            .execute();

        const insertedDiagnosisId = diagnosisInsertResult.identifiers[diagnosisInsertResult.identifiers.length - 1].id;
        return this.getDiagnosisById(insertedDiagnosisId);
    }

    async updateDiagnosis(id: string, updateDiagnosisDto: UpdateDiagnosisDto): Promise<DiagnosisDomainEntity> {
        await this.diagnosisRepository
            .createQueryBuilder()
            .update(DiagnosisOrmEntity)
            .set(updateDiagnosisDto)
            .where("id = :id", { id })
            .execute();

        return this.getDiagnosisById(id);
    }

    async deleteDiagnosis(id: string): Promise<void> {
        await this.diagnosisRepository
            .createQueryBuilder()
            .delete()
            .from(DiagnosisOrmEntity)
            .where("id = :id", { id })
            .execute();
    }
}
