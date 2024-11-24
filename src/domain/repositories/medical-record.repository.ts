import {MedicalRecord} from "../entities/medical-record.entity";
import {CreateMedicalRecordDto} from "../dto/medical-record/create-medical-record.dto";
import {UpdateMedicalRecordDto} from "../dto/medical-record/update-medical-record.dto";

export abstract class MedicalRecordRepository {
    abstract getMedicalRecordById(medicalRecordId: string): Promise<MedicalRecord>;
    abstract getMedicalRecord(medicalRecordId: string, doctorId: string, patientId: string): Promise<MedicalRecord>;
    abstract getMedicalRecords(): Promise<Array<MedicalRecord>>;
    abstract getDoctorMedicalRecords(doctorId: string): Promise<Array<MedicalRecord>>;
    abstract getPatientMedicalRecords(patientId: string): Promise<Array<MedicalRecord>>;
    abstract createMedicalRecord(doctorId: string, patientId: string, createMedicalRecordDto: CreateMedicalRecordDto): Promise<MedicalRecord>;
    abstract updateMedicalRecord(medicalRecordId: string, updateMedicalRecordDto: UpdateMedicalRecordDto): Promise<MedicalRecord>;
    abstract deleteMedicalRecord(medicalRecordId: string): Promise<void>;
}