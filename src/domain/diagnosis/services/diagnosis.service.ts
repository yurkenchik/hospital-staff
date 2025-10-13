import { Inject, Injectable } from "@nestjs/common";
import { DiagnosisRepository } from "../repositories/diagnosis.repository";
import { CreateDiagnosisDto } from "../dto/request/create-diagnosis.dto";
import { UpdateDiagnosisDto } from "../dto/request/update-diagnosis.dto";
import { DiagnosisNotFoundException } from "@core/exceptions/not-found/diagnosis-not-found.exception";
import { DiagnosisDomainEntity } from "../entities/diagnosis-domain.entity";
import { DIAGNOSIS_REPOSITORY } from "@domain/diagnosis/diagnosis.tokens";

@Injectable()
export class DiagnosisService {
    constructor(
        @Inject(DIAGNOSIS_REPOSITORY)
        private readonly diagnosisRepository: DiagnosisRepository,
    ) {}

    async getDiagnosisById(diagnosisId: string): Promise<DiagnosisDomainEntity> {
        const diagnosis = await this.diagnosisRepository.getDiagnosisById(diagnosisId);
        if (!diagnosis) {
            throw new DiagnosisNotFoundException();
        }
        return diagnosis;
    }

    async getDiagnoses(): Promise<Array<DiagnosisDomainEntity>> {
        return this.diagnosisRepository.getDiagnoses();
    }

    async createDiagnosis(createDiagnosisDto: CreateDiagnosisDto): Promise<DiagnosisDomainEntity> {
        return await this.diagnosisRepository.createDiagnosis(createDiagnosisDto);
    }

    async updateDiagnosis(diagnosisId: string, updateDiagnosisDto: UpdateDiagnosisDto): Promise<DiagnosisDomainEntity> {
        return await this.diagnosisRepository.updateDiagnosis(diagnosisId, updateDiagnosisDto);
    }

    async deleteDiagnosis(diagnosisId: string): Promise<void> {
        await this.diagnosisRepository.deleteDiagnosis(diagnosisId);
    }
}