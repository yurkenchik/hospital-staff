import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { PatientService } from "@domain/patient/services/patient.service";
import { PatientDomainEntity } from "@domain/patient/entities/patient-domain.entity";
import { UpdatePatientDto } from "@domain/patient/dto/request/update-patient.dto";
import { CreatePatientDto } from "@domain/patient/dto/request/create-patient.dto";

@Controller('patients')
export class PatientController {
    constructor(private readonly patientService: PatientService) {}

    @Get(":id")
    async getPatientById(@Param("id") patientId: string): Promise<PatientDomainEntity> {
        return this.patientService.getPatientById(patientId)
    }

    @Get()
    async getPatients(): Promise<Array<PatientDomainEntity>> {
        return this.patientService.getPatients();
    }

    @Post()
    async createPatient(@Body() createPatientDto: CreatePatientDto): Promise<PatientDomainEntity> {
        return this.patientService.createPatient(createPatientDto);
    }

    @Patch(":id")
    async updatePatient(
        @Param("id") patientId: string,
        @Body() updatePatientDto: UpdatePatientDto
    ): Promise<PatientDomainEntity> {
        return this.patientService.updatePatient(patientId, updatePatientDto);
    }

    @Delete(":id")
    async deletePatient(@Param("id") patientId: string): Promise<void> {
        return this.patientService.deletePatient(patientId);
    }
}