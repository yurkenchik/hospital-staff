import { MedicalRecordDomainEntity } from "../entities/medical-record-domain.entity";
import { CreateMedicalRecordDto } from "../dto/request/create-medical-record.dto";
import { UpdateMedicalRecordDto } from "../dto/request/update-medical-record.dto";

export interface MedicalRecordRepository {
    getMedicalRecordById(medicalRecordId: string): Promise<MedicalRecordDomainEntity>;
    getMedicalRecord(medicalRecordId: string, doctorId: string, patientId: string): Promise<MedicalRecordDomainEntity>;
    getMedicalRecords(): Promise<Array<MedicalRecordDomainEntity>>;
    getDoctorMedicalRecords(doctorId: string): Promise<Array<MedicalRecordDomainEntity>>;
    getPatientMedicalRecords(patientId: string): Promise<Array<MedicalRecordDomainEntity>>;
    createMedicalRecord(doctorId: string, patientId: string, createMedicalRecordDto: CreateMedicalRecordDto): Promise<MedicalRecordDomainEntity>;
    updateMedicalRecord(medicalRecordId: string, updateMedicalRecordDto: UpdateMedicalRecordDto): Promise<MedicalRecordDomainEntity>;
    deleteMedicalRecord(medicalRecordId: string): Promise<void>;
}