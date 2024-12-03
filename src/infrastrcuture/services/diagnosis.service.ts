import {Injectable} from "@nestjs/common";
import {DiagnosisRepository} from "../../domain/repositories/diagnosis.repository";
import {Diagnosis} from "../../domain/entities/diagnosis.entity";
import {CreateDiagnosisDto} from "../../domain/dto/diagnosis/create-diagnosis.dto";
import {UpdateDiagnosisDto} from "../../domain/dto/diagnosis/update-diagnosis.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {InsertResult, Repository} from "typeorm";
import {DiagnosisNotFoundException} from "../../common/exceptions/not-found/diagnosis-not-found.exception";

@Injectable()
export class DiagnosisService extends DiagnosisRepository {
    constructor(
        @InjectRepository(Diagnosis)
        private readonly diagnosisRepository: Repository<Diagnosis>,
    ) {
        super();
    }

    async getDiagnosisById(diagnosisId: string): Promise<Diagnosis> {
        const diagnosis = await this.diagnosisRepository
            .createQueryBuilder()
            .where("id = :diagnosisId", { diagnosisId })
            .getOne();

        if (!diagnosis) {
            throw new DiagnosisNotFoundException();
        }
        return diagnosis;
    }

    async getDiagnoses(): Promise<Array<Diagnosis>> {
        return this.diagnosisRepository
            .createQueryBuilder()
            .getMany();
    }

    async createDiagnosis(createDiagnosisDto: CreateDiagnosisDto): Promise<Diagnosis> {
        const diagnosisInsertResult: InsertResult = await this.diagnosisRepository
            .createQueryBuilder()
            .insert()
            .into(Diagnosis)
            .values(createDiagnosisDto)
            .execute();

        const insertedDiagnosis = diagnosisInsertResult.identifiers[diagnosisInsertResult.identifiers.length - 1].id;
        return this.getDiagnosisById(insertedDiagnosis);
    }

    async updateDiagnosis(diagnosisId: string, updateDiagnosisDto: UpdateDiagnosisDto): Promise<Diagnosis> {
        await this.diagnosisRepository
            .createQueryBuilder()
            .update(Diagnosis)
            .set(updateDiagnosisDto)
            .where("id = :diagnosisId", { diagnosisId })
            .execute();

        return this.getDiagnosisById(diagnosisId);
    }

    async deleteDiagnosis(diagnosisId: string): Promise<void> {
        await this.diagnosisRepository
            .createQueryBuilder()
            .delete()
            .from(Diagnosis)
            .where("id = :diagnosisId", { diagnosisId })
            .execute();
    }
}