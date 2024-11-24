import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {DiagnosisService} from "../../infrastrcuture/services/diagnosis.service";
import {Diagnosis} from "../../domain/entities/diagnosis.entity";
import {CreateDiagnosisDto} from "../../domain/dto/diagnosis/create-diagnosis.dto";
import {UpdateDiagnosisDto} from "../../domain/dto/diagnosis/update-diagnosis.dto";

@Controller('diagnosis')
export class DiagnosisController {
    constructor(
        private readonly diagnosisService: DiagnosisService
    ) {}

    @Get(":id")
    async getDiagnosisById(@Param("id") diagnosisId: string) {
        return this.diagnosisService.getDiagnosisById(diagnosisId);
    }

    @Get()
    async getDiagnoses(): Promise<Array<Diagnosis>> {
        return this.diagnosisService.getDiagnoses();
    }

    @Post()
    async createDiagnosis(@Body() createDiagnosisDto: CreateDiagnosisDto): Promise<Diagnosis> {
        return this.diagnosisService.createDiagnosis(createDiagnosisDto);
    }

    @Patch(":id")
    async updateDiagnosis(
        @Param("id") diagnosisId: string,
        @Body() updateDiagnosisDto: UpdateDiagnosisDto
    ): Promise<Diagnosis> {
        return this.diagnosisService.updateDiagnosis(diagnosisId, updateDiagnosisDto);
    }

    @Delete(":id")
    async deleteDiagnosis(@Param("id") diagnosisId: string): Promise<void> {
        return this.diagnosisService.deleteDiagnosis(diagnosisId);
    }
}