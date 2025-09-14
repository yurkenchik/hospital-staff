import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { PatientOrmEntity } from './patient-orm.entity';
import { DoctorOrmEntity } from './doctor-orm.entity';

@Entity('medical_records')
export class MedicalRecordOrmEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    visitDate: Date;

    @Column()
    notes: string;

    @ManyToOne(() => PatientOrmEntity, (patient) => patient.medicalRecords, { onDelete: 'CASCADE' })
    patient: PatientOrmEntity;

    @ManyToOne(() => DoctorOrmEntity, (doctor) => doctor.medicalRecords, { onDelete: 'CASCADE' })
    doctor: DoctorOrmEntity;
}
