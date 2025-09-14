import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository } from "typeorm";
import { TreatmentOrmEntity } from "@infrastructure/orm-entities/treatment-orm.entity";
import { TreatmentDomainEntity } from "@domain/treatment/entities/treatment-domain.entity";
import { TreatmentOrmMapper } from "@core/mappers/orm/treatment-orm.mapper";
import { TreatmentRepository } from "@domain/treatment/repositories/treatment.repository";
import { CreateTreatmentDto } from "@domain/treatment/dto/request/create-treatment.dto";
import { UpdateTreatmentDto } from "@domain/treatment/dto/request/update-treatment.dto";

@Injectable()
export class TreatmentPostgresRepository implements TreatmentRepository {
    constructor(
        @InjectRepository(TreatmentOrmEntity)
        private readonly treatmentRepository: Repository<TreatmentOrmEntity>,
    ) {}

    async getTreatmentById(id: string): Promise<TreatmentDomainEntity | null> {
        const treatmentOrmEntity = await this.treatmentRepository
            .createQueryBuilder()
            .where("id = :id", { id })
            .getOne();

        if (!treatmentOrmEntity) {
            return null;
        }
        return TreatmentOrmMapper.toDomainEntity(treatmentOrmEntity);
    }

    async getTreatments(): Promise<Array<TreatmentDomainEntity>> {
        const treatmentOrmEntities = await this.treatmentRepository
            .createQueryBuilder()
            .getMany();

        return treatmentOrmEntities.map(treatment => TreatmentOrmMapper.toDomainEntity(treatment));
    }

    async createTreatment(createTreatmentDto: CreateTreatmentDto): Promise<TreatmentDomainEntity> {
        const treatmentInsertResult: InsertResult = await this.treatmentRepository
            .createQueryBuilder()
            .insert()
            .into(TreatmentOrmEntity)
            .values(createTreatmentDto)
            .execute();

        const insertedTreatmentId = treatmentInsertResult.identifiers[treatmentInsertResult.identifiers.length - 1].id;
        return this.getTreatmentById(insertedTreatmentId);
    }

    async updateTreatment(id: string, updateTreatmentDto: UpdateTreatmentDto): Promise<TreatmentDomainEntity> {
        await this.treatmentRepository
            .createQueryBuilder()
            .update(TreatmentOrmEntity)
            .set(updateTreatmentDto)
            .where("id = :id", { id })
            .execute();

        return this.getTreatmentById(id);
    }

    async deleteTreatment(id: string): Promise<void> {
        await this.treatmentRepository
            .createQueryBuilder()
            .delete()
            .from(TreatmentOrmEntity)
            .where("id = :id", { id })
            .execute();
    }
}
