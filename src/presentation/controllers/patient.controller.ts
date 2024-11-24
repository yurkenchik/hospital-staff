import {Body, Controller, Delete, Get, Param, Patch, Post} from "@nestjs/common";
import {PatientService} from "../../infrastrcuture/services/patient.service";
import {Patient} from "../../domain/entities/patient.entity";
import {CreatePatientDto} from "../../domain/dto/patient/create-patient.dto";
import {UpdatePatientDto} from "../../domain/dto/patient/update-patient.dto";

@Controller('patients')
export class PatientController {
    constructor(
        private readonly patientService: PatientService
    ) {}

    @Get(":id")
    async getPatientById(@Param("id") patientId: string): Promise<Patient> {
        return this.patientService.getPatientById(patientId)
    }

    @Get()
    async getPatients(): Promise<Array<Patient>> {
        return this.patientService.getPatients();
    }

    @Post()
    async createPatient(@Body() createPatientDto: CreatePatientDto): Promise<Patient> {
        return this.patientService.createPatient(createPatientDto);
    }

    @Patch(":id")
    async updatePatient(
        @Param("id") patientId: string,
        @Body() updatePatientDto: UpdatePatientDto
    ): Promise<Patient> {
        return this.patientService.updatePatient(patientId, updatePatientDto);
    }

    @Delete(":id")
    async deletePatient(@Param("id") patientId: string): Promise<void> {
        return this.patientService.deletePatient(patientId);
    }
}