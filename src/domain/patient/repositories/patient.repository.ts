import { PatientDomainEntity } from "../entities/patient-domain.entity";
import { CreatePatientDto } from "@domain/patient/dto/request/create-patient.dto";
import { UpdatePatientDto } from "@domain/patient/dto/request/update-patient.dto";

export interface PatientRepository {
    getPatientById(id: string): Promise<PatientDomainEntity | null>;
    getPatients(): Promise<Array<PatientDomainEntity>>;
    createPatient(createPatientDto: CreatePatientDto): Promise<PatientDomainEntity>;
    updatePatient(id: string, updatePatientDto: UpdatePatientDto): Promise<PatientDomainEntity>;
    deletePatient(id: string): Promise<void>;
}
