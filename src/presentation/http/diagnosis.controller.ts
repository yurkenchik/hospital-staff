import { Body, Controller, Delete, Get, Param, Patch, Post, HttpStatus } from "@nestjs/common";
import { DiagnosisService } from "@domain/diagnosis/services/diagnosis.service";
import { CreateDiagnosisDto } from "@domain/diagnosis/dto/request/create-diagnosis.dto";
import { UpdateDiagnosisDto } from "@domain/diagnosis/dto/request/update-diagnosis.dto";
import { DiagnosisDomainEntity } from "@domain/diagnosis/entities/diagnosis-domain.entity";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DiagnosisNotFoundException } from "@core/exceptions/not-found/diagnosis-not-found.exception";

@Controller('diagnosis')
export class DiagnosisController {
    constructor(private readonly diagnosisService: DiagnosisService) {}

    @ApiOperation({ summary: 'Get a diagnosis by ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The diagnosis record', type: DiagnosisDomainEntity })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: DiagnosisNotFoundException.prototype.message })
    @Get(":id")
    async getDiagnosisById(@Param("id") diagnosisId: string) {
        return this.diagnosisService.getDiagnosisById(diagnosisId);
    }

    @ApiOperation({ summary: 'Get all diagnoses' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Array of diagnosis records', type: [DiagnosisDomainEntity] })
    @Get()
    async getDiagnoses(): Promise<Array<DiagnosisDomainEntity>> {
        return this.diagnosisService.getDiagnoses();
    }

    @ApiOperation({ summary: 'Create a new diagnosis' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The created diagnosis record', type: DiagnosisDomainEntity })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input.' })
    @Post()
    async createDiagnosis(@Body() createDiagnosisDto: CreateDiagnosisDto): Promise<DiagnosisDomainEntity> {
        return this.diagnosisService.createDiagnosis(createDiagnosisDto);
    }

    @ApiOperation({ summary: 'Update a diagnosis by ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The updated diagnosis record', type: DiagnosisDomainEntity })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: DiagnosisNotFoundException.prototype.message })
    @Patch(":id")
    async updateDiagnosis(
        @Param("id") diagnosisId: string,
        @Body() updateDiagnosisDto: UpdateDiagnosisDto
    ): Promise<DiagnosisDomainEntity> {
        return this.diagnosisService.updateDiagnosis(diagnosisId, updateDiagnosisDto);
    }

    @ApiOperation({ summary: 'Delete a diagnosis by ID' })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Diagnosis successfully deleted.' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: DiagnosisNotFoundException.prototype.message })
    @Delete(":id")
    async deleteDiagnosis(@Param("id") diagnosisId: string): Promise<void> {
        return this.diagnosisService.deleteDiagnosis(diagnosisId);
    }
}