import { Body, Controller, Delete, Get, Param, Patch, Post, HttpStatus } from "@nestjs/common";
import { PatientService } from "@domain/patient/services/patient.service";
import { PatientDomainEntity } from "@domain/patient/entities/patient-domain.entity";
import { UpdatePatientDto } from "@domain/patient/dto/request/update-patient.dto";
import { CreatePatientDto } from "@domain/patient/dto/request/create-patient.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PatientNotFoundException } from "@core/exceptions/not-found/patient-not-found.exception";

@Controller('patients')
export class PatientController {
    constructor(private readonly patientService: PatientService) {}

    @ApiOperation({ summary: 'Get a patient by ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The patient record', type: PatientDomainEntity })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: PatientNotFoundException.prototype.message })
    @Get(":id")
    async getPatientById(@Param("id") patientId: string): Promise<PatientDomainEntity> {
        return this.patientService.getPatientById(patientId)
    }

    @ApiOperation({ summary: 'Get all patients' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Array of patient records', type: [PatientDomainEntity] })
    @Get()
    async getPatients(): Promise<Array<PatientDomainEntity>> {
        return this.patientService.getPatients();
    }

    @ApiOperation({ summary: 'Create a new patient' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The created patient record', type: PatientDomainEntity })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input.' })
    @Post()
    async createPatient(@Body() createPatientDto: CreatePatientDto): Promise<PatientDomainEntity> {
        return this.patientService.createPatient(createPatientDto);
    }

    @ApiOperation({ summary: 'Update a patient by ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The updated patient record', type: PatientDomainEntity })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: PatientNotFoundException.prototype.message })
    @Patch(":id")
    async updatePatient(
        @Param("id") patientId: string,
        @Body() updatePatientDto: UpdatePatientDto
    ): Promise<PatientDomainEntity> {
        return this.patientService.updatePatient(patientId, updatePatientDto);
    }

    @ApiOperation({ summary: 'Delete a patient by ID' })
    @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Patient successfully deleted.' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: PatientNotFoundException.prototype.message })
    @Delete(":id")
    async deletePatient(@Param("id") patientId: string): Promise<void> {
        return this.patientService.deletePatient(patientId);
    }
}