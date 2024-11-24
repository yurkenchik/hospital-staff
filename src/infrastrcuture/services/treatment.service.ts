import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {InsertResult, Repository} from 'typeorm';
import {Treatment} from "../../domain/entities/treatment.entity";
import {CreateTreatmentDto} from "../../domain/dto/treatment/create-treatment.dto";
import {UpdateTreatmentDto} from "../../domain/dto/treatment/update-treatment.dto";
import {TreatmentNotFoundException} from "../../common/exceptions/not-found/treatment-not-found.exception";
import {TreatmentRepository} from "../../domain/repositories/treatment.repository";

@Injectable()
export class TreatmentService extends TreatmentRepository {
    constructor(
        @InjectRepository(Treatment)
        private readonly treatmentRepository: Repository<Treatment>,
    ) {
        super();
    }

    async getTreatmentById(treatmentId: string): Promise<Treatment> {
        const treatment = await this.treatmentRepository
            .createQueryBuilder()
            .where("id = :treatmentId", { treatmentId })
            .getOne();

        if (!treatment) {
            throw new TreatmentNotFoundException();
        }
        return treatment;
    }

    async getTreatments(): Promise<Array<Treatment>> {
        return this.treatmentRepository
            .createQueryBuilder()
            .getMany();
    }

    async createTreatment(createTreatmentDto: CreateTreatmentDto): Promise<Treatment> {
        const treatmentInsertResult: InsertResult = await this.treatmentRepository
            .createQueryBuilder()
            .insert()
            .into(Treatment)
            .values(createTreatmentDto)
            .execute();

        const insertedTreatmentId = treatmentInsertResult.identifiers[treatmentInsertResult.identifiers.length - 1].id;
        return this.getTreatmentById(insertedTreatmentId);
    }

    async updateTreatment(treatmentId: string, updateTreatmentDto: UpdateTreatmentDto): Promise<Treatment> {
        await this.treatmentRepository
            .createQueryBuilder()
            .update()
            .set(updateTreatmentDto)
            .where("id = :treatmentId", { treatmentId })
            .execute();

        return this.getTreatmentById(treatmentId);
    }

    async deleteTreatment(treatmentId: string): Promise<void> {
        await this.treatmentRepository
            .createQueryBuilder()
            .delete()
            .from(Treatment)
            .where("id = :treatmentId", { treatmentId })
            .execute();
    }
}
