import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Patient } from './patient.entity';
import { Doctor } from './doctor.entity';

@Entity('medical_records')
export class MedicalRecord {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Patient, (patient) => patient.medicalRecords, {
        onDelete: 'CASCADE'
    })
    patient: Patient;

    @ManyToOne(() => Doctor, (doctor) => doctor.medicalRecords, {
        onDelete: 'CASCADE'
    })
    doctor: Doctor;

    @Column()
    visitDate: Date;

    @Column()
    notes: string;
}
