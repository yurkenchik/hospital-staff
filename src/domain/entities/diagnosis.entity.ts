import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AppointmentDiagnosis } from './appointment-diagnosis.entity';

@Entity('diagnoses')
export class Diagnosis {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: "diagnosis_name" })
    diagnosisName: string;

    @Column({ nullable: true })
    description: string;

    @OneToMany(() => AppointmentDiagnosis, (ad) => ad.diagnosis, {
        cascade: true,
    })
    appointmentDiagnoses: AppointmentDiagnosis[];
}