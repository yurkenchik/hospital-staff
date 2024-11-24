import {Diagnosis} from "../entities/diagnosis.entity";
import {CreateDiagnosisDto} from "../dto/diagnosis/create-diagnosis.dto";
import {UpdateDiagnosisDto} from "../dto/diagnosis/update-diagnosis.dto";

export abstract class DiagnosisRepository {
    abstract getDiagnosisById(diagnosisId: string): Promise<Diagnosis>;
    abstract getDiagnoses(): Promise<Array<Diagnosis>>;
    abstract createDiagnosis(createDiagnosisDto: CreateDiagnosisDto): Promise<Diagnosis>;
    abstract updateDiagnosis(diagnosisId: string, updateDiagnosisDto: UpdateDiagnosisDto): Promise<Diagnosis>;
    abstract deleteDiagnosis(diagnosisId: string): Promise<void>;
}