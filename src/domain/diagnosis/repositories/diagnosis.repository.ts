import { DiagnosisDomainEntity } from "../entities/diagnosis-domain.entity";
import { CreateDiagnosisDto } from "@domain/diagnosis/dto/request/create-diagnosis.dto";
import { UpdateDiagnosisDto } from "@domain/diagnosis/dto/request/update-diagnosis.dto";

export interface DiagnosisRepository {
    getDiagnosisById(id: string): Promise<DiagnosisDomainEntity | null>;
    getDiagnoses(): Promise<Array<DiagnosisDomainEntity>>;
    createDiagnosis(createDiagnosisDto: CreateDiagnosisDto): Promise<DiagnosisDomainEntity>;
    updateDiagnosis(id: string, updateDiagnosisDto: UpdateDiagnosisDto): Promise<DiagnosisDomainEntity>;
    deleteDiagnosis(id: string): Promise<void>;
}
