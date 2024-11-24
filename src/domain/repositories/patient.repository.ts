import {Patient} from "../entities/patient.entity";
import {CreatePatientDto} from "../dto/patient/create-patient.dto";
import {UpdatePatientDto} from "../dto/patient/update-patient.dto";

export abstract class PatientRepository {
    abstract getPatientById(patientId: string): Promise<Patient>;
    abstract getPatients(): Promise<Array<Patient>>;
    abstract createPatient(createPatientDto: CreatePatientDto): Promise<Patient>;
    abstract updatePatient(patientId: string, updatePatientDto: UpdatePatientDto): Promise<Patient>;
    abstract deletePatient(patientId: string): Promise<void>;
}