import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { DiagnosisService } from "@domain/diagnosis/services/diagnosis.service";
import { CreateDiagnosisDto } from "@domain/diagnosis/dto/request/create-diagnosis.dto";
import { UpdateDiagnosisDto } from "@domain/diagnosis/dto/request/update-diagnosis.dto";
import { DiagnosisDomainEntity } from "@domain/diagnosis/entities/diagnosis-domain.entity";

@Controller('diagnosis')
export class DiagnosisController {
    constructor(private readonly diagnosisService: DiagnosisService) {}

    @Get(":id")
    async getDiagnosisById(@Param("id") diagnosisId: string) {
        return this.diagnosisService.getDiagnosisById(diagnosisId);
    }

    @Get()
    async getDiagnoses(): Promise<Array<DiagnosisDomainEntity>> {
        return this.diagnosisService.getDiagnoses();
    }

    @Post()
    async createDiagnosis(@Body() createDiagnosisDto: CreateDiagnosisDto): Promise<DiagnosisDomainEntity> {
        return this.diagnosisService.createDiagnosis(createDiagnosisDto);
    }

    @Patch(":id")
    async updateDiagnosis(
        @Param("id") diagnosisId: string,
        @Body() updateDiagnosisDto: UpdateDiagnosisDto
    ): Promise<DiagnosisDomainEntity> {
        return this.diagnosisService.updateDiagnosis(diagnosisId, updateDiagnosisDto);
    }

    @Delete(":id")
    async deleteDiagnosis(@Param("id") diagnosisId: string): Promise<void> {
        return this.diagnosisService.deleteDiagnosis(diagnosisId);
    }
}