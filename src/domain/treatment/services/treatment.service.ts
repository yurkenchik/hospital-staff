import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TreatmentRepository } from "../repositories/treatment.repository";
import { CreateTreatmentDto } from "../dto/request/create-treatment.dto";
import { UpdateTreatmentDto } from "../dto/request/update-treatment.dto";
import { TreatmentNotFoundException } from "@core/exceptions/not-found/treatment-not-found.exception";
import { TreatmentDomainEntity } from "../entities/treatment-domain.entity";
import { TREATMENT_REPOSITORY } from "@domain/treatment/treatment.tokens";

@Injectable()
export class TreatmentService {
    constructor(
        @Inject(TREATMENT_REPOSITORY)
        private readonly treatmentRepository: TreatmentRepository,
    ) {}

    async getTreatmentById(treatmentId: string): Promise<TreatmentDomainEntity> {
        const treatment = await this.treatmentRepository.getTreatmentById(treatmentId);
        if (!treatment) {
            throw new TreatmentNotFoundException();
        }
        return treatment;
    }

    async getTreatments(): Promise<Array<TreatmentDomainEntity>> {
        return this.treatmentRepository.getTreatments();
    }

    async createTreatment(createTreatmentDto: CreateTreatmentDto): Promise<TreatmentDomainEntity> {
        return await this.treatmentRepository.createTreatment(createTreatmentDto);
    }

    async updateTreatment(treatmentId: string, updateTreatmentDto: UpdateTreatmentDto): Promise<TreatmentDomainEntity> {
        return await this.treatmentRepository.updateTreatment(treatmentId, updateTreatmentDto);
    }

    async deleteTreatment(treatmentId: string): Promise<void> {
        await this.treatmentRepository.deleteTreatment(treatmentId);
    }
}
